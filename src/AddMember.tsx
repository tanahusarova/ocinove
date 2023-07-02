import React, { useRef, useState, useEffect } from 'react';
import InputColor from 'react-input-color';
import {Member} from './Member';
import Select from 'react-select'


type MemberPair = {
    name: string;
    id: string;
    color: string;
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


  const handleChange = () => {
    if (selectedId >= 0) {
        members[selectedId].color = colourChange;
        if(nameChange !== '')
            members[selectedId].name = nameChange;
        generateOptions()
    }

    setNameChange('');
    setColourChange('#88c20cff');
    setSelectedId(-1);


};

const handleNew = () => {
    addComponent(nameNew, colourNew);
    setNameNew('');
    setColourNew('#88c20cff');
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


  const handleSelection = (selectedOption: OptionMember | null) => {
    console.log(selectedOption?.label, selectedOption?.value);
    setSelectedId(selectedOption ? selectedOption?.value : -1);
    console.log(selectedOption?.value);
    console.log(selectedOption ? selectedOption?.value : -1);

    if (selectedId >= 0) {
        console.log('som tu');
        setNameChange(members[selectedId].name)
        setColourChange(members[selectedId].color);
    }
  };

  const generateOptions = () => {

       let newOptions:OptionMember[] = [];

       for (let i = 0; i < members.length; i++){
        let nameMem = members[i].name;
        let id = Number(members[i].id);

        newOptions.push({label: nameMem, value: id})
       }

       setOptions(newOptions);
     };


const addComponent = (name:string, color:string) => {
    let id = getId();

 //   setMembersObj(membersObj.concat(newComponent)); //pre vykreslovanie
    setMembers([...members, {name: name, id: id, color: color}]); //pre vyhladavanie pri zmene
    generateOptions();
    console.log(id);

  };

  useEffect(() => {
    generateOptions();
  }, [members]);
  
  useEffect(() => {
  }, [colourChange, nameChange]);
  

 return (
<div>
    <div className='app'>

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
            <button className="button-front-page" 
            onClick={handleNew}>Ulož</button>

        </div>
        </div>
    <div className='add_member'>
    <h1>Upraviť účastníka</h1>
    <div>
        <label htmlFor="type">Učastník</label>
        <Select 
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
        <button className="button-front-page" 
        onClick={handleChange}>Ulož</button>
         <button className="button-front-page" 
        onClick={handleChange}>Vymaž</button>
        </div>

    </div>
    </div>
    </div>

    <div className='playground'></div>
</div>

<div>
   {members.map((value:MemberPair) => <Member name={value.name} id={value.id} color={value.color}/>)}
</div>
</div>
    
    );
};

export default AddMember;