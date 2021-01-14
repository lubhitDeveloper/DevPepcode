let buyPlanButtons= document.querySelectorAll(".sub-btn");
let allLis= document.querySelectorAll(".showcase-ul li");
const stripe= Stripe('pk_test_51I57mWLxKd7kg4sUpCRlJ1nF88bz74i78JUscG9yRcFlwbyeFWul5muQLzYmdCmLRe1BUlzsz31E97cVF6P0wfME0007ozZdX1');

for(let i=0; i<buyPlanButtons.length; i++){
    buyPlanButtons[i].addEventListener("click", async function(){
        try{
            if(allLis.length< 6){
                window.location.href= "/login";
            }
            else{
                let planId= buyPlanButtons[i].getAttribute("planId");
                let session= await axios.post("http://localhost:3000/api/booking/createPaymentSession", {planId: planId});
                let sessId= session.data.session.id;
                let result= await stripe.redirectToCheckout({sessionId: sessId});
                console.log(result);
            }
        }
        catch(error){
            alert(error.message);
        }
    })
}