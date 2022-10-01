import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { useDispatch, useSelector } from 'react-redux';
// import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
// import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction';
import Rating from '@mui/material/Rating';
// import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
// import Actions from './Actions';
import MetaData from '../Layouts/MetaData';
import BackdropLoader from '../Layouts/BackdropLoader';
import { useSelector } from 'react-redux';

const WorkerTable = ({worker}) => {
    const { loading } = useSelector((state) => state.product);
    console.log(worker,"worker")

    // useEffect(() => {
        
    // }, []);


    const columns = [
        
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full">
                            <img draggable="false" src={params.row.image} alt={params.row.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {params.row.name}
                    </div>
                )
            },
        },
    ];

    // const rows = [];

    // products && products.forEach((item) => {
    //     rows.unshift({
    //         id: item._id,
    //         name: item.name,
    //         image: item.images[0].url,
    //         category: item.category,
    //         stock: item.stock,
    //         price: item.price,
    //         cprice: item.cuttedPrice,
    //         rating: item.ratings,
    //     });
    // });

    return (
        <>
            <MetaData title="Admin Products | Flipkart" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Artisans</h1>
                {/* <Link to="/admin/new_product" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Product</Link> */}
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>

                {/* <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                /> */}

<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Contact</th>
    </tr>
  </thead>
  <tbody>
    {
        worker.map((item,index)=>{
            return (
            <tr key={index}>
            <th scope="row">{item.name}</th>
            <td>{item.phone}</td>
          </tr>
            )
        })
    }
  </tbody>
</table>

            </div>
        </>
    );
};

export default WorkerTable;