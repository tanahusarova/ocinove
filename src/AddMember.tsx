import React, { useRef, useState, useEffect } from 'react';
import InputColor from 'react-input-color';
import {Member} from './Member';
import Select from 'react-select'
import Parameters from './Parameters';
import { useSearchParams } from "react-router-dom";
import {saveMembers} from './api/Save.js'





type MemberPair = {
    name: string;
    id: string;
    color: string;
    valid: boolean;
    parameters: Parameters;
    positionHead: {x:number, y:number};
    positionArrow: {x:number, y:number};

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
  const [nameFile, setNameFile] = useState("id=default.txt");


  //nastaveny interval na ukladanie

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


const positionChangeHead = (id:string, x:number, y:number) =>{
    members[Number(id)].positionHead.x = x;
    members[Number(id)].positionHead.y = y;
    send();

}

const positionChangeArrow = (id:string, x:number, y:number) =>{
  let reg: RegExp = /\d+/;
  let matches = id.match(reg);
  members[Number(matches?.[0])].positionArrow.x = x;
  members[Number(matches?.[0])].positionArrow.y = y;
  send();
}

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
  send();
};

const handleNew = () => {
    addComponent(nameNew, colourNew);
    setNameNew('');
    setColourNew('#88c20cff');
    setSelectedOption(null);
    send();
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
    let result = '';  //id, text, color, xhead, yhead, xarrow, yarrow
    members.map((value:MemberPair) => {
      if (value.valid){
          let head = document.getElementById(value.id);
          let arrow = document.getElementById(`arrow_${value.id}`);
          //console.log(value.positionHead.x);
          //console.log(`~|${value.id}||${value.name}|${value.positionHead.x}||${value.positionHead.y}||${value.positionArrow.x}||${value.positionArrow.y}|&`);
          result += `~|${value.id}||${value.name}||${value.color}||${value.positionHead.x}||${value.positionHead.y}||${value.positionArrow.x}||${value.positionArrow.y}|&`;

      }
        
    });
    return result;
  };

  async function postToPhp(body:string) {
    fetch(`http://www.jusoft.sk/konstelacie/test/save.php?${nameFile}`, {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: `${body}`
    })
}

async function saveMembers(body:string) {
  let response = await fetch(`/users/members`, {
      method: 'POST',
      headers: {
          'Accept': 'text/plain',
          'Content-Type': 'text/plain'
      },
      body: `${body}`
  })

  if (response.status === 200) {
      console.log("prechadza post saveMembers");
      return response;
  }
  else {
    console.log(response.status);
}
}

const send = () => {
     console.log("vola sa send");
     saveMembers(prepareStringToPost()).then((res) => { console.log("preslo saveMembers"); }
     ).catch(err => console.log('problem s ukladanim'));
  };

async function get() {
    return fetch(`/users/members`, {
        })
    .then(
        response => {
            console.log("prechadza post getMembers");
            console.log(response);
            response.text()
            .then(t => {
              console.log("som tu t " + t);
              reload(t);
              }
              )
             .catch((error) => {
            // Better way would be to throw error here and let the client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("chyba 2");
            return "";})
        });
}

/*
async function get() {
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
  */

  const handleSelection = (selectedOption: OptionMember | null) => {
    setSelectedId(selectedOption ? selectedOption?.value : -1);
    setSelectedOption(selectedOption);

    if (selectedId >= 0) {
        //console.log('som tu');
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
    let p:Parameters  = {arrow:'translate(0px, 0px)', head:'translate(0px, 0px)'};
    setMembers([...members, {name: name, id: id, color: color, valid:true, parameters:p, positionHead:{x:0, y:0}, positionArrow:{x:0, y:0}}]); //pre vyhladavanie pri zmene
    generateOptions();
    send();
  };

  const reload = (t:string) =>{
    //`~|${value.id}||${value.name}||${value.color}||${value.positionHead.x}||${value.positionHead.y}||${value.positionArrow.x}||${value.positionArrow.y}|&`
     let regex: RegExp =  /~\|\d+\|\|[^|~]+\|\|\#[^|~]+\|\|[+-]?\d+\|\|[+-]?\d+\|\|[+-]?\d+\|\|[+-]?\d+\|&/g;
     let reg: RegExp = /[^|~&]+/g;
     let matches = t.match(regex);
     let size = matches?.length;
     setMembers([]);
     
     if (size === undefined || size === 0) return;
     setIdNew(size);

     var mem:MemberPair[] = [];
     for (let i = 0; i < size; i++){
        let p = matches?.[i]?.match(reg);
        if (p === undefined || p?.length === undefined || p?.length < 7) {
          console.log("zly obsah parsera v reload");
          return;
        }

        let id:string = p ? p[0] : "";
        let text:string = p ? p[1] : "";
        let color:string = p ? p[2] : "";
        let paramHeadX:string = p ? p[3] : "";
        let paramHeadY:string = p ? p[4] : "";
        let paramArrowX:string = p ? p[5] : "";
        let paramArrowY:string = p ? p[6] : "";
     
        let parameters:Parameters  = {arrow:"", head:""};
        mem = [...mem, {name: text, id: id, color: color, valid:true, parameters:parameters, 
        positionHead:{x:Number(paramHeadX), y:Number(paramHeadY)}, positionArrow:{x:Number(paramArrowX), y:Number(paramArrowY)}}]; //pre vyhladavanie pri zmene

     }

     setMembers(mem);
     //console.log(matches);
    

  }

  useEffect(() => {
    generateOptions();
  }, [members]);
  
  useEffect(() => {
  }, [colourChange, nameChange]);
  
  useEffect(() => {
  }, []);

 return (
<div>
<label>verzia 2.3</label>
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
        <button className="button-save" style={{top:'300px'}}   
        onClick={send}>Uložiť konšteláciu</button>
        <button className="button-save" style={{top:'380px'}}    
        onClick={get}>Načítať konšteláciu</button>
        <input value={nameFile} onChange={(e) => setNameFile(e.target.value)} type="name" placeholder="nazov suboru" id="file" name="file" />

        </div>
<div>
   {members.map((value:MemberPair) => (value.valid ? <Member name={value.name} id={value.id} color={value.color} parameters={value.parameters} 
   positionChangeHead={positionChangeHead} positionChangeArrow={positionChangeArrow} positionHead={value.positionHead} positionArrow={value.positionArrow} /> : null))}
</div>
</div>
    
    );
};

export default AddMember;