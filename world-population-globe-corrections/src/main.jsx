import React, {useEffect, useMemo, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import Globe from "react-globe.gl";
import {feature} from "topojson-client";
import "./style.css";

const COUNTRIES = [
["Россия","RU",61.5240,105.3188],["США","US",37.0902,-95.7129],["Китай","CN",35.8617,104.1954],["Индия","IN",20.5937,78.9629],
["Бразилия","BR",-14.2350,-51.9253],["Германия","DE",51.1657,10.4515],["Франция","FR",46.2272,2.2137],["Италия","IT",41.8719,12.5674],
["Испания","ES",40.4637,-3.7492],["Великобритания","GB",55.3781,-3.4360],["Канада","CA",56.1304,-106.3468],["Япония","JP",36.2048,138.2529],
["Южная Корея","KR",35.9078,127.7669],["Австралия","AU",-25.2744,133.7751],["Мексика","MX",23.6345,-102.5528],
["Польша","PL",51.9194,19.1451],["Украина","UA",48.3794,31.1656],["Беларусь","BY",53.7098,27.9534],["Швейцария","CH",46.8182,8.2275],
["Нидерланды","NL",52.1326,5.2913],["Турция","TR",38.9637,35.2433],["Норвегия","NO",60.4720,8.4689],["Швеция","SE",60.1282,18.6435],
["Финляндия","FI",61.9241,25.7482],["Чехия","CZ",49.8175,15.4730],["Австрия","AT",47.5162,14.5501],["Португалия","PT",39.3999,-8.2245],
["Греция","GR",39.0742,21.8243],["Аргентина","AR",-38.4161,-63.6167],["ЮАР","ZA",-30.5595,22.9375],
["Казахстан","KZ",48.0196,66.9237],["Узбекистан","UZ",41.3775,64.5853],["Азербайджан","AZ",40.1431,47.5769],["Армения","AM",40.0691,45.0382],
["Грузия","GE",42.3154,43.3569],["Румыния","RO",45.9432,24.9668],["Болгария","BG",42.7339,25.4858],["Сербия","RS",44.0165,21.0059],
["Хорватия","HR",45.1000,15.2000],["Словакия","SK",48.6690,19.6990],["Словения","SI",46.1512,14.9955],["Венгрия","HU",47.1625,19.5033],
["Литва","LT",55.1694,23.8813],["Латвия","LV",56.8796,24.6035],["Эстония","EE",58.5953,25.0136],["Исландия","IS",64.9631,-19.0208],
["Ирландия","IE",53.1424,-7.6921],["Дания","DK",56.2639,9.5018],["Бельгия","BE",50.5039,4.4699],["Люксембург","LU",49.8153,6.1296],
["Мальта","MT",35.9375,14.3754],["Кипр","CY",35.1264,33.4299],["Албания","AL",41.1533,20.1683],["Монголия","MN",46.8625,103.8467],
["Вьетнам","VN",14.0583,108.2772],["Таиланд","TH",15.8700,100.9925],["Малайзия","MY",4.2105,101.9758],["Сингапур","SG",1.3521,103.8198],
["Индонезия","ID",-0.7893,113.9213],["Филиппины","PH",12.8797,121.7740],["Иран","IR",32.4279,53.6880],["Ирак","IQ",33.2232,43.6793],
["Израиль","IL",31.0461,34.8516],["Саудовская Аравия","SA",23.8859,45.0792],["ОАЭ","AE",23.4241,53.8478],["Катар","QA",25.3548,51.1839],
["Кувейт","KW",29.3117,47.4818],["Оман","OM",21.4735,55.9754],["Египет","EG",26.8206,30.8025],["Марокко","MA",31.7917,-7.0926],
["Алжир","DZ",28.0339,1.6596],["Тунис","TN",33.8869,9.5375],["Нигерия","NG",9.0820,8.6753],["Кения","KE",-0.0236,37.9062],
["Эфиопия","ET",9.1450,40.4897],["Гана","GH",7.9465,-1.0232],["Танзания","TZ",-6.3690,34.8888],["Уганда","UG",1.3733,32.2903],
["Замбия","ZM",-13.1339,27.8493],["Зимбабве","ZW",-19.0154,29.1549],["Ботсвана","BW",-22.3285,24.6849],["Намибия","NA",-22.9576,18.4904],
["Мозамбик","MZ",-18.6657,35.5296],["Мадагаскар","MG",-18.7669,46.8691],["Куба","CU",21.5218,-77.7812],
["Доминиканская Республика","DO",18.7357,-70.1627],["Ямайка","JM",18.1096,-77.2975],["Коста-Рика","CR",9.7489,-83.7534],["Панама","PA",8.5380,-80.7821],
["Гватемала","GT",15.7835,-90.2308],["Гондурас","HN",15.2000,-86.2419],["Сальвадор","SV",13.7942,-88.8965],["Никарагуа","NI",12.8654,-85.2072],
["Колумбия","CO",4.5709,-74.2973],["Венесуэла","VE",6.4238,-66.5897],["Эквадор","EC",-1.8312,-78.1834],["Перу","PE",-9.1900,-75.0152],
["Боливия","BO",-16.2902,-63.5887],["Парагвай","PY",-23.4425,-58.4438],["Уругвай","UY",-32.5228,-55.7658],["Чили","CL",-35.6751,-71.5430],
["Новая Зеландия","NZ",-40.9006,174.8860]
];

const JOBS = [
 "Топ-менеджмент","Руководители отделов и направлений","HR и управление персоналом",
 "Обучение и развитие","Продажи и развитие бизнеса","Административные и экспертные позиции",
 "Наука и образование","Самозанятые","Другое"
];

const storageKey = "world-population-people-v4";
const seed = [
 {id:"demo-1",country:"Россия",job:"Продажи и развитие бизнеса",gender:"Мужской"},
 {id:"demo-2",country:"США",job:"Административные и экспертные позиции",gender:"Мужской"},
 {id:"demo-3",country:"Германия",job:"Наука и образование",gender:"Женский"},
 {id:"demo-4",country:"Китай",job:"Самозанятые",gender:"Женский"}
];

function loadPeople(){
 try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (!Array.isArray(saved)) return seed;
  return saved
   .filter(p => p && COUNTRIES.some(c => c[0] === p.country) && JOBS.includes(p.job))
   .map(p => ({...p, gender: p.gender === "Женский" ? "Женский" : "Мужской"}));
 } catch { return seed; }
}

function App(){
 const globeRef = useRef();
 const [people,setPeople] = useState(loadPeople);
 const [country,setCountry] = useState("");
 const [job,setJob] = useState("");
 const [gender,setGender] = useState("Мужской");
 const [auto,setAuto] = useState(true);
 const [countryShapes,setCountryShapes] = useState([]);
 const [globeSize,setGlobeSize] = useState({width:0,height:0});
 const globeAreaRef = useRef(null);

 useEffect(()=>localStorage.setItem(storageKey,JSON.stringify(people)),[people]);

 useEffect(()=>{
  fetch("https://unpkg.com/world-atlas@2/countries-110m.json")
   .then(r=>r.json())
   .then(topo=>{
    const geo = feature(topo, topo.objects.countries);
    setCountryShapes(geo.features);
   })
   .catch(()=>setCountryShapes([]));
 },[]);

 useEffect(()=>{
  const el=globeAreaRef.current;
  if(!el) return;
  const ro=new ResizeObserver(entries=>{
   const r=entries[0].contentRect;
   setGlobeSize({width:Math.max(320,Math.floor(r.width)),height:Math.max(320,Math.floor(r.height))});
  });
  ro.observe(el);
  return ()=>ro.disconnect();
 },[]);

 useEffect(()=>{
  const g=globeRef.current;
  if(!g) return;
  g.controls().autoRotate=auto;
  g.controls().autoRotateSpeed=.22;
  g.controls().enableDamping=true;
  g.controls().dampingFactor=.08;
  g.pointOfView({lat:18,lng:18,altitude:2.35},0);
 },[auto]);

 const counts=useMemo(()=>{
  const m={}; people.forEach(p=>m[p.country]=(m[p.country]||0)+1); return m;
 },[people]);

 const jobCounts=useMemo(()=>{
  const m={}; people.forEach(p=>m[p.job]=(m[p.job]||0)+1); return m;
 },[people]);

 const points=useMemo(()=>people.map((p,i)=>{
  const c=COUNTRIES.find(x=>x[0]===p.country);
  if(!c) return null;
  return {lat:c[2]+((i%5)-2)*.22,lng:c[3]+((i%7)-3)*.28,label:`${p.country} • ${p.job} • ${p.gender}`,size:.24};
 }).filter(Boolean),[people]);

 const labels=useMemo(()=>COUNTRIES.filter(c=>counts[c[0]]).map(c=>({
  lat:c[2],lng:c[3],text:String(counts[c[0]]),size:Math.min(.72+.18*Math.log2(counts[c[0]]+1),1.65)
 })),[counts]);

 const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,7);
 const men=people.filter(p=>p.gender==="Мужской").length;
 const women=people.filter(p=>p.gender==="Женский").length;

 const add=()=>{
  if(!country || !job) return;
  setPeople(p=>[...p,{id:crypto.randomUUID(),country,job,gender}]);
  setCountry(""); setJob("");
 };

 const reset=()=>setPeople([]);

 return <div className="app">
  <header className="top">
   <div className="brand"><div className="brandIcon">◎</div><div><b>Карта населения мира</b><small>Люди. Страны. Профессии. Вся планета.</small></div></div>
   <div className="headerActions"><button className="iconBtn">☼ ◐</button><button className="lang">RU⌄</button></div>
  </header>

  <main className="dashboard">
   <aside className="leftPanel panel">
    <div className="panelHeading"><div className="headingIcon">♙</div><div><h1>Добавить человека на карту</h1><p>Заполните данные, чтобы увидеть человека на глобусе.</p></div></div>

    <label>Страна</label>
    <select value={country} onChange={e=>setCountry(e.target.value)}>
     <option value="">Выберите страну</option>{COUNTRIES.map(c=><option key={c[1]+"-"+c[0]}>{c[0]}</option>)}
    </select>

    <label>Пол</label>
    <div className="genders">
     {["Мужской","Женский"].map(x=><button type="button" aria-pressed={gender===x} className={gender===x?"active":""} onClick={()=>setGender(x)} key={x}>{x==="Мужской"?"♂":"♀"}&nbsp; {x}</button>)}
    </div>

    <label>Должность</label>
    <select value={job} onChange={e=>setJob(e.target.value)}>
     <option value="">Выберите должность</option>{JOBS.map(x=><option key={x}>{x}</option>)}
    </select>

    <button className="add" onClick={add}><span>＋</span> Добавить на карту</button>

    <div className="leftInfo">
     <div className="infoTitle">◎ &nbsp; Выбрать страну на карте</div>
     <p>Кликните на страну на глобусе, чтобы увидеть статистику по ней в реальном времени.</p>
    </div>
    <div className="leftInfo muted">ⓘ &nbsp; Данные обновляются в реальном времени</div>
   </aside>

   <section className="globeArea" ref={globeAreaRef}>
    <div className="globeGlow"/>
    <div className="globeCanvas">
    <Globe ref={globeRef}
     width={globeSize.width || 800}
     height={globeSize.height || 700}
     backgroundColor="#020711"
     globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
     bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
     showAtmosphere={true}
     atmosphereColor="#35a9ff"
     atmosphereAltitude={.17}
     polygonsData={countryShapes}
     polygonGeoJsonGeometry="geometry"
     polygonCapColor={()=>"rgba(18,52,70,.16)"}
     polygonSideColor={()=>"rgba(45,160,215,.12)"}
     polygonStrokeColor={()=>"rgba(110,218,255,.78)"}
     polygonAltitude={.006}
     polygonLabel={d=>d.properties?.name || ""}
     pointsData={points}
     pointLat="lat" pointLng="lng" pointColor={()=>"#72e7ff"} pointRadius="size" pointAltitude={.018}
     pointLabel="label"
     labelsData={labels} labelLat="lat" labelLng="lng" labelText="text" labelSize="size"
     labelColor={()=>"#ffffff"} labelDotRadius={.045} labelAltitude={.026}
    />
   </div>
    <div className="globeControls"><button>−</button><button onClick={()=>globeRef.current?.pointOfView({lat:18,lng:18,altitude:2.35},700)}>◉</button><button>＋</button></div>
    <label className="rotate"><input type="checkbox" checked={auto} onChange={e=>setAuto(e.target.checked)}/> Автовращение</label>
   </section>

   <aside className="rightPanel panel">
    <div className="statsTitle"><span>▥</span><h2>Общая статистика</h2></div>
    <div className="statGrid">
     <div><span className="statIcon">♟</span><b>{people.length.toLocaleString("ru-RU")}</b><small>Всего</small></div>
     <div><span className="statIcon blue">♂</span><b>{men.toLocaleString("ru-RU")}</b><small>Мужчины</small></div>
     <div><span className="statIcon pink">♀</span><b>{women.toLocaleString("ru-RU")}</b><small>Женщины</small></div>
    </div>

    <section className="statsSection">
     <div className="sectionTitle">◉ &nbsp; Топ стран</div>
     {top.length ? top.map(([c,n],i)=><div className="countryRow" key={c}><span className="rank">{i+1}</span><span>{c}</span><strong>{n}</strong><i><em style={{width:`${Math.max(8,(n/(top[0]?.[1]||1))*100)}%`}}/></i></div>) : <div className="empty">Добавьте первого человека</div>}
    </section>

    <section className="statsSection jobs">
     <div className="sectionTitle">▣ &nbsp; Распределение по должностям</div>
     {JOBS.map(j=><div className="jobRow" key={j}><span className="dot"/><span>{j}</span><strong>{jobCounts[j]||0}</strong></div>)}
    </section>

    <button className="clear" onClick={reset}>Очистить данные</button>
   </aside>
  </main>
 </div>
}

createRoot(document.getElementById("root")).render(<App/>);
