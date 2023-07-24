import React, { useRef, useState, useEffect } from 'react';
import InputColor from 'react-input-color';
import {Member} from './Member';
import Select from 'react-select'
import Parameters from './Parameters';
import { useSearchParams } from "react-router-dom";





type MemberPair = {
    name: string;
    id: string;
    color: string;
    valid: boolean;
    parameters: Parameters;
  };

  type OptionMember = {
    value: number;
    label: string;
  };


const AddMember = () => {
    //ulozeni vytvoreni clenovia

  //na zobrazenie potrebujem samostatne objekty
//  const [membersObj, setMembersObj] = useState<Member[]>([]);
  const [members, setMembers] = useState<MemberPair[]>([]);


  const [nameNew, setNameNew] = useState('');
  const [colourNew, setColourNew] = useState('#88c20cff');
  const [idNew, setIdNew] = useState(0);

  const [nameChange, setNameChange] = useState('');
  const [colourChange, setColourChange] = useState('#88c20cff');
  const [selectedId, setSelectedId] = useState(-1);
  const [options, setOptions] = useState<OptionMember[]>([]);;
  const [render, setRender] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionMember | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({});


  const handleChange = () => {
    if (selectedId >= 0) {
        members[selectedId].color = colourChange;
        if(nameChange !== ''){
            members[selectedId].name = nameChange;
            if (selectedOption) setSelectedOption({label: nameChange, value:selectedOption.value});
        }
        generateOptions()
    }
    setSelectedOption(null);
    setNameChange('');
    setColourChange('#88c20cff');
    setSelectedId(-1);
};

useEffect(() => {
  setRender(false);
}, [render]);

const handleDelete = () => {
  if (selectedId >= 0) {
      members[selectedId].valid = false;
      setRender(true);
      setSelectedOption(null);
      generateOptions();
  }

  setSelectedOption(null);
  setNameChange('');
  setColourChange('#88c20cff');
  setSelectedId(-1);
};

const handleNew = () => {
    addComponent(nameNew, colourNew);
    setNameNew('');
    setColourNew('#88c20cff');
    setSelectedOption(null);
};

const incId = () => {
    setIdNew(idNew + 1);
};

const getId = () => {
    let tmp:string = '' + idNew;
    incId();
    return tmp;
};

const handleColorChangeNew = (newColor: { hex: string; }) => {
    setColourNew(newColor.hex);
  };

const handleColorChangeChange = (newColor: { hex: string; }) => {
    setColourChange(newColor.hex);
  };

const prepareStringToPost = () => {
    let result = '';  //id, text, color, topHead, leftHead, topArrow, leftArrow
    members.map((value:MemberPair) => {
      if (value.valid){
          let head = document.getElementById(value.id);
          let arrow = document.getElementById(`arrow_${value.id}`);
          result += `~|${value.id}||${value.name}||${value.color}||${head?.style.transform}||${arrow?.style.transform}|&`;

      }
        
    });
    return result;
  };

  async function postToPhp(body:string) {
    fetch(`http://www.jusoft.sk/konstelacie/test/save.php?${searchParams}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: `${body}`
    })
}

const send = () => {
     postToPhp(prepareStringToPost()).then((res) => { console.log("preslo"); }
     ).catch(err => console.log('problem s pridavanim eventu v new evente'));
  };

function get() {
    var res:string = "";
    
    fetch(`http://www.jusoft.sk/konstelacie/test/load.php?${searchParams}`, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'text/plain'
      }, 
        }).then(r => {
            r.text()
            .then(t => {
              reload(t);
              console.log(t);
            })

        });

    return res;
  
 };

  const handleSelection = (selectedOption: OptionMember | null) => {
    console.log(selectedOption?.label, selectedOption?.value);
    setSelectedId(selectedOption ? selectedOption?.value : -1);
    setSelectedOption(selectedOption);
    console.log(selectedOption?.value);
    console.log(selectedOption ? selectedOption?.value : -1);

    if (selectedId >= 0) {
        console.log('som tu');
        setNameChange(members[selectedId].name)
        setColourChange(members[selectedId].color);
    }
    setRender(true);
  };

  const generateOptions = () => {

       let newOptions:OptionMember[] = [];

       for (let i = 0; i < members.length; i++){
        if (!members[i].valid) continue;
        let nameMem = members[i].name;
        let id = Number(members[i].id);

        newOptions.push({label: nameMem, value: id})
       }

       setOptions(newOptions);
     };


const addComponent = (name:string, color:string) => {
    let id = getId();

 //   setMembersObj(membersObj.concat(newComponent)); //pre vykreslovanie
    let p:Parameters  = {arrow:'translate(0px, 0px)', head:'translate(0px, 0px)'};
    setMembers([...members, {name: name, id: id, color: color, valid:true, parameters:p}]); //pre vyhladavanie pri zmene
    generateOptions();
    console.log(id);


   //  -236.5 -266.5
  };

  const reload = (t:string) =>{  //id, text, color, paramHead, paramArrow translate(0px, 0px)
     let regex: RegExp =  /~\|\d+\|\|[^|~]+\|\|\#[^|~]+\|\|translate\([+-]?\d+(\.\d+)?\p\x\,\s[+-]?\d+(\.\d+)?\p\x\)\|\|translate\([+-]?\d+(\.\d+)?\p\x\,\s[+-]?\d+(\.\d+)?\p\x\)\|&/g;
     let reg: RegExp = /[^|~&]+/g;
     let matches = t.match(regex);
     let size = matches?.length;
     console.log(matches);
     setMembers([]);
     

     if (size === undefined || size === 0) return;
    var mem:MemberPair[] = [];
     for (let i = 0; i < size; i++){
        let p = matches?.[i]?.match(reg);
        if (p === undefined || p?.length === undefined || p?.length < 8) {
          console.log("zly obsah parsera v reload");
        }

        let id:string = p ? p[0] : "";
        let text:string = p ? p[1] : "";
        let color:string = p ? p[2] : "";
        let paramHead:string = p ? p[3] : "";
        let paramArrow:string = p ? p[4] : "";
     
        let parameters:Parameters  = {arrow:paramArrow, head:paramHead};
        mem = [...mem, {name: text, id: id, color: color, valid:true, parameters:parameters}]; //pre vyhladavanie pri zmene

     }

     setMembers(mem);
     console.log(matches);
    

  }

  useEffect(() => {
    generateOptions();
  }, [members]);
  
  useEffect(() => {
  }, [colourChange, nameChange]);
  

 return (
<div>
<div className='left_panel'>
    <div className='add_member_whole'>
        <div className='add_member'>
        <h1>Pridať účastníka</h1>
          <div>
          <label htmlFor="name">Meno</label>
          <input value={nameNew} onChange={(e) => setNameNew(e.target.value)} type="name" placeholder="meno" id="name" name="name" />
          <label htmlFor="color">Farba</label>
            <InputColor
             initialValue={colourNew}
             onChange={handleColorChangeNew}
             placement="right"
             />
            <button style={{marginLeft: '60px'}}
            onClick={handleNew}>Ulož</button>

        </div>
        </div>
    <div className='add_member'>
    <h1>Upraviť účastníka</h1>
    <div>
        <label htmlFor="type">Učastník</label>
        <Select 
        value={selectedOption}
        options={options}
        onChange={handleSelection}
        />
        <label htmlFor="name">Meno</label>
        <input value={nameChange} onChange={(e) => setNameChange(e.target.value)} type="name" placeholder="meno" id="name" name="name" />
        <label htmlFor="color">Farba</label>
            <InputColor
             initialValue={colourChange}
             onChange={handleColorChangeChange}
             placement="right"
             />
             
             <div className='buttons'>
        <button 
        onClick={handleChange}>Ulož</button>
         <button 
        onClick={handleDelete}>Vymaž</button>
        </div>
        </div>
        </div>
    </div>
    <div className='playground'></div>
    </div>

<div className='button-save'>
        <button className="button-save" style={{top:'380px'}}   
        onClick={send}>Uložiť konšteláciu</button>
        <button className="button-save" style={{top:'300px'}}    
        onClick={get}>Načítať konšteláciu</button>
        </div>
<div>
   {members.map((value:MemberPair) => (value.valid ? <Member name={value.name} id={value.id} color={value.color} parameters={value.parameters}/> : null))}
</div>
</div>
    
    );
};

export default AddMember;