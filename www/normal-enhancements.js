/* NutriSport 1.3.8 - mejoras normales, sin funciones PRO */
(function(){
  'use strict';
  const KEY='nutrisport_daily_tip_v1';
  const TIPS=[
    '💧 Reparte el agua durante el día en lugar de tomarla toda de una vez.',
    '🥦 Añadir verduras y fruta entera ayuda a aumentar fibra y volumen de las comidas.',
    '🍳 Intenta incluir una fuente de proteína en tus comidas principales.',
    '🚶 Una caminata corta después de comer puede ayudarte a mantenerte activo.',
    '😴 Dormir bien también forma parte de una rutina saludable.',
    '📏 Usa el peso, el IMC y tus hábitos como referencias; observa tendencias, no un solo día.',
    '📝 Registrar lo que comes durante varios días puede ayudarte a detectar patrones.'
  ];

  function style(){
    if(document.getElementById('ns-daily-style'))return;
    const st=document.createElement('style');st.id='ns-daily-style';st.textContent=`
      .ns-daily-tools{margin:0 0 20px;padding:16px;border:1px solid rgba(34,197,94,.18);border-radius:20px;background:linear-gradient(135deg,rgba(34,197,94,.08),rgba(15,26,15,.96));box-shadow:0 12px 35px rgba(0,0,0,.16)}
      .ns-day-head{display:flex;justify-content:space-between;gap:12px;align-items:center}.ns-day-kicker{font-size:9px;letter-spacing:.16em;font-weight:900;color:#4ade80}.ns-day-head h2{font-size:19px;font-weight:900;margin-top:3px}.ns-day-head p{font-size:10px;color:rgba(255,255,255,.42);margin-top:3px}.ns-day-icon{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.22);color:#4ade80;font-weight:900;font-size:20px}
      .ns-day-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:13px}.ns-day-metrics>div{padding:10px;border-radius:14px;background:rgba(0,0,0,.16);border:1px solid rgba(255,255,255,.06)}.ns-day-metrics small,.ns-day-metrics span{display:block;color:rgba(255,255,255,.42);font-size:9px}.ns-day-metrics strong{display:block;font-size:16px;margin:2px 0}.ns-day-tip{display:flex;gap:8px;flex-direction:column;margin-top:10px;padding:10px 11px;border-radius:13px;background:rgba(0,0,0,.14);border:1px solid rgba(255,255,255,.06);font-size:11px;line-height:1.45}.ns-day-tip b{color:#d9ffe4}.ns-day-tip span{color:rgba(255,255,255,.62)}.ns-day-copy{margin-top:10px;width:100%;min-height:38px;border-radius:11px;border:1px solid rgba(34,197,94,.24);background:rgba(34,197,94,.09);color:#4ade80;font-weight:900;font-size:11px}
      @media(max-width:520px){.ns-day-metrics{grid-template-columns:1fr 1fr}.ns-day-metrics>div:last-child{grid-column:span 2}}
    `;document.head.appendChild(st);
  }
  function user(){try{return window.firebaseAuth?.currentUser||null}catch(e){return null}}
  function profile(){
    const u=user(); if(!u)return null;
    let d={};
    for(const k of ['nutritrack_v2_'+u.uid,'nutritrack_v2']){
      try{const x=JSON.parse(localStorage.getItem(k)||'null'); if(x){d={...(x.profile||{}),...x};break}}catch(e){}
    }
    return d;
  }
  function esc(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function calc(p){
    const w=Number(p?.weight)||0, h=Number(p?.height)||0, age=Number(p?.age)||0;
    const gender=p?.gender==='M'?'M':'F';
    const activity=Number(p?.activity)||1.55;
    if(!w||!h||!age)return null;
    const bmi=w/Math.pow(h/100,2);
    const bmr=10*w+6.25*h-5*age+(gender==='M'?5:-161);
    const tdee=Math.round(bmr*activity);
    const water=Math.round(w*30);
    return {bmi:bmi.toFixed(1),bmr:Math.round(bmr),tdee,water};
  }
  function tip(){
    const day=Math.floor(Date.now()/86400000);
    return TIPS[day%TIPS.length];
  }
  function isDashboard(){
    return [...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Inicio' && /bg-\[#22c55e\]/.test(String(b.className)));
  }
  function inject(){
    style();
    if(!user()||!isDashboard()) { document.getElementById('ns-daily-tools')?.remove(); return; }
    const root=document.getElementById('root'); if(!root)return;
    const host=root.querySelector('.max-w-\\[980px\\]')||root.querySelector('[class*="max-w-[980px]"]');
    if(!host||document.getElementById('ns-daily-tools'))return;
    const c=calc(profile())||{};
    const date=new Intl.DateTimeFormat('es-MX',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
    const el=document.createElement('section'); el.id='ns-daily-tools'; el.className='ns-daily-tools';
    el.innerHTML=`<div class="ns-day-head"><div><span class="ns-day-kicker">RESUMEN DIARIO</span><h2>Tu día en NutriSport</h2><p>${esc(date.charAt(0).toUpperCase()+date.slice(1))}</p></div><div class="ns-day-icon">✓</div></div>
      <div class="ns-day-metrics">
        <div><small>IMC</small><strong>${c.bmi||'—'}</strong><span>referencia</span></div>
        <div><small>Calorías</small><strong>${c.tdee||'—'}</strong><span>estimación/día</span></div>
        <div><small>Agua</small><strong>${c.water?c.water+' ml':'—'}</strong><span>referencia/día</span></div>
      </div>
      <div class="ns-day-tip"><b>💡 Consejo de hoy</b><span>${esc(tip())}</span></div>
      <button type="button" class="ns-day-copy">Copiar resumen</button>`;
    host.appendChild(el);
    el.querySelector('.ns-day-copy').onclick=async()=>{
      const txt=`NutriSport — ${date}\nIMC: ${c.bmi||'sin datos'}\nCalorías estimadas: ${c.tdee||'sin datos'} kcal/día\nAgua de referencia: ${c.water||'sin datos'} ml/día\nConsejo: ${tip()}`;
      try{await navigator.clipboard.writeText(txt);el.querySelector('.ns-day-copy').textContent='✓ Resumen copiado';setTimeout(()=>el.querySelector('.ns-day-copy').textContent='Copiar resumen',1600)}catch(e){window.NutriSportUX?.toast?.('No se pudo copiar el resumen.')}
    };
  }
  function start(){
    inject();
    new MutationObserver(inject).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
    setInterval(inject,1500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
