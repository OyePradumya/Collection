import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function Options(props) {
    let selrow = props.selrow;

    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const submit = (e) => {
        e.preventDefault();
        if (selectedIndex == -1) {
            alert("You need to choose one option!");
        }
        else {
            if (selrow[selectedIndex + 1] == selrow[5]) {
                props.incCorr();
                props.updateAns([selrow[selectedIndex + 1], selrow[5]]);
                props.changeQno(props.qno + 1);
                setSelectedIndex(-1);
            }
            else {
                props.incWrong();
                props.updateAns([selrow[selectedIndex + 1], selrow[5]]);
                props.changeQno(props.qno + 1);
                setSelectedIndex(-1);
            }
        }
    }
    return (
        <div className='mx-auto rounded'>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#1f2937', borderRadius: '12px' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemButton
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <div className='flex justify-start text-white tracking-widest'>
                                <h1>A.</h1>
                            </div>
                        </ListItemIcon>
                        <ListItemText primary={selrow[1]} />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <div className='flex justify-start text-white tracking-widest'>
                                <h1>B.</h1>
                            </div>
                        </ListItemIcon>
                        <ListItemText primary={selrow[2]} />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <div className='flex justify-start text-white tracking-widest'>
                                <h1>C.</h1>
                            </div>
                        </ListItemIcon>
                        <ListItemText primary={selrow[3]} />
                    </ListItemButton>
                    <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <div className='flex justify-start text-white tracking-widest'>
                                <h1>D.</h1>
                            </div>
                        </ListItemIcon>
                        <ListItemText primary={selrow[4]} />
                    </ListItemButton>
                </List>
            </Box>
            <div className='mt-1'>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mt-1.5 text-center mr-3 md:mr-0 hover:bg-blue-700 focus:ring-blue-800 shadow-xl" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default Options
