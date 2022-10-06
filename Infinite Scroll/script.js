const container = document.querySelector('.container');

let limit = 6;
let pageCount = 1;
let postCount = 1;

const getPosts = async ()=>{

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}$_page=${pageCount}`);
    // console.log(response);
    const data = await response.json();
    console.log(data);


    data.map((curElm, index) =>{

        const htmlData = `
        <div class="posts">
            <p class="post-id">${postCount++}</p>
            <h2 class="title">${curElm.title}</h2>
            <p class="post-info">${curElm.body}</p>
        </div>
        `;

        container.insertAdjacentHTML('beforeend', htmlData)
    })
    
}

getPosts();


const showData = ()=>{
    setTimeout(() => {
        pageCount++;
        getPosts();
    }, 300);
}


window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
        showData();
    }
});


