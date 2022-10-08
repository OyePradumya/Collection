var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const getBal = async (address) => {
    const getBal = await web3.eth.getBalance(address)
    const amtConversion = await web3.utils.fromWei(getBal)
    document.getElementById("bal").innerHTML = "Balance: " + amtConversion + " ETH"
}

document.getElementById("btn").addEventListener("click", () => {
    getBal(document.getElementsByTagName("input")[0].value)
})