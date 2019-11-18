import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import CardMedia from '@material-ui/core/CardMedia';
const MyComponent = (props) => {
  const [profileState, setProfileState] = useState(props);
  const formatOptionLabel = ({ picture, name }) => (
    <div style={{ display: "flex", height: '40px', textAlign: 'center' }}>
      <CardMedia
        style={{
        width: '100px', 
        height: '40px',
        border: '1px',
        borderRadius: '4px',
        padding: '5px',
       }}
        image={picture.medium}
      />
      <div style={{ marginLeft: "100px", marginTop: '5px' }}>
        {name.first}
      </div>
    </div>
  );
  return(
    <Select className={props.classes.styleSelect} 
    options={props.data} 
    formatOptionLabel={formatOptionLabel}
    onChange={props.onChange}
    isSearchable={props.isSearchable} />
    )
  }

export default MyComponent