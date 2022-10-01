import { useState, useEffect } from 'react'
import MetaData from '../Layouts/MetaData';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Divider } from '@mui/material';
const Service = () => {
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);

    const fetchData = async () => {
        setloading(true);
        const data = await fetch('./api/v1/get-service');
        const parsedData = await data.json();
        setdata(parsedData);
        setloading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            {loading && !data ? (<div style={{
                width: '100%',
                height: '500px',
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }} >
                Loading...
            </div>) : (
                <>
                    <MetaData title="Shopping Cart  " />
                    <main className="w-full mt-20">
                        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
                            <div className="flex-1">
                                <div style={{
                                    padding: "10px",
                                }} className="flex flex-col shadow bg-white">
                                    {data.map((service, index) => (
                                        <span style={{
                                            margin: '10px',
                                            border: "1px solid #000",
                                            borderRadius: 14,
                                            overflow: "hidden",
                                        }} key={index} className="font-medium text-lg px-2 sm:px-8 py-2 border-b">
                                            <Card sx={{ display: 'flex', borderRadius: 3 }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 300 }}
                                                    image='https://user-images.githubusercontent.com/76216765/190843770-adbbf577-031d-4f71-8edd-09c871bcf534.jpg'
                                                    alt="Live from space album cover"
                                                />
                                                <Box style={{ width: '100%', display: "flex", flexDirection: "column" }} >
                                                    <Box style={{ flex: 1, flexDirection:"raw",width: '100%', paddingLeft: "10px", borderBottom: "0.2px solid #000" }}>
                                                        {service.title}
                                                    </Box>
                                                    <Box style={{ flex: 1, flexDirection:"raw",width: '100%', paddingLeft: "10px", borderBottom: "0.2px solid #000" }}>
                                                        {service.cost}
                                                    </Box>
                                                    <Box style={{ flex: 1, width: '100%', paddingLeft: "10px", borderBottom: "0.2px solid #000" }}>
                                                        {service.description}
                                                    </Box>
                                                    <Box style={{ display: "flex", flexDirection: "column", flex: 2, width: '100%' }}>
                                                        {service.requirements.map((e, index) => (
                                                            <>
                                                                <div key={index} style={{
                                                                    flex: 1,
                                                                }} className="flex justify-around items-center text-md rounded bg-blue-50">
                                                                    <div style={{
                                                                        flex: 1,
                                                                    }} className="flex justify-around items-center">
                                                                        <p className="text-gray-500 font-medium">{e.title}</p>
                                                                    </div>
                                                                    <Divider orientation="vertical" />
                                                                    <div style={{
                                                                        flex: 1,
                                                                    }} className="flex justify-around items-center">
                                                                        <p>{e.description}</p>
                                                                    </div>
                                                                </div>
                                                                <Divider />
                                                            </>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            </Card>
                                            <button
                                                style={{
                                                    // width
                                                    margin: "5px",
                                                }}
                                                onClick={() => { }}
                                                style={{
                                                    float: "right",
                                                    marginTop: 5,
                                                }}
                                                className={
                                                    "p-1.5 flex items-center justify-center gap-2 text-white bg-red-600 rounded-sm shadow hover:shadow-lg"
                                                }
                                            >
                                                {/* <FlashOnIcon /> */}
                                                ACCEPT
                                            </button>
                                        </span>
                                    ))}
                                    <div className="flex justify-end">
                                    </div>
                                </div>
                                <div className="flex flex-col mt-5 shadow bg-white">
                                </div>
                            </div>
                        </div>

                    </main>
                </>
            )}
        </>
    );
};

export default Service;
