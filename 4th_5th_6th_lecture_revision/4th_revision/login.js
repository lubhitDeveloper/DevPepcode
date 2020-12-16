const puppeteer= require("puppeteer");
 let tab;

 let browserOpenPromise= puppeteer.launch({
     headless: false,
     defaultViewport: null,
     args:["--start-maximized"]
 });
  browserOpenPromise.then(function (browser) {
      let pagesPromise= browser.pages();
      return pagesPromise;
  })
  .then(function (pages) {
      let page= pages[0];
      tab= page;
      let pageOpenedPromise= page.goto("https://www.hackerrank.com/auth/login");
      return pageOpenedPromise;
  })
  .then(function () {
      let idTypedPromise= tab.type("#input-1", "yoxoya3171@yamails.net");
      return idTypedPromise;
  })
  .then(function() {
      
      let passTypedPromise= tab.type("#input-2", "12345678");
      return passTypedPromise;
  })
  .then(function() {
      let loginBtnClickedPromise= tab.click('button[data-analytics="LoginPassword"]');
      return loginBtnClickedPromise;
  })
  .then(function(){
      let waitAndClickPromise= waitAndClick("#base-card-1-link");
      return waitAndClickPromise;
  })
  .then(function(){
      let waitAndClickPromise= waitAndClick("#base-card-2-link");
      return waitAndClickPromise;
  })
  .then(function(){
    let waitPromise= tab.waitForSelector(".js-track-click.challenge-list-item");
    return waitPromise;
  })
  .then(function(){
      let allQuestionsPromise= tab.$$(".js-track-click.challenge-list-item")
      return allQuestionsPromise;
  })
  .then(function(allQuestions){
      let allLinksPromise= [];
      for(let i=0; i<allQuestions.length; i++)
      {
          let linkPendingPromise= tab.evaluate(function(elem){
              return elem.getAttribute("href");
          }, allQuestions[i]);
          allLinksPromise.push(linkPendingPromise);
      }
      let allQuestionsPromise= Promise.all(allLinksPromise);
      return allQuestionsPromise;
  })
  .then(function(allLinks)
  {
      let completeLinks= [];
      for(let i=0;i<allLinks.length;i++)
      {
          let completeLink="https://www.hackerrank.com"+ allLinks[i];
          completeLinks.push(completeLink);
      }
      
      let oneQuesSolvePromise =solveQuestion(completeLinks[0]);
      for(let i=1;i<completeLinks.length;i++)
      {
          oneQuesSolvePromise=oneQuesSolvePromise.then(function(){
              let nextQuesSolvePromise= solveQuestion(completeLinks[i]);
              return nextQuesSolvePromise;
          })
      }
   })
  .then(function(){
      console.log("All Questions Solved !!");
  })
  .catch(function (error) {
    console.log(error);
  });

  function waitAndClick(selector)
  {
      return new Promise(function(resolve, reject){
          let waitPromise= tab.waitForSelector(selector, {visible: true});
          waitPromise.then(function()
          {
              let clickedPromise= tab.click(selector);
              return clickedPromise;
          })
          .then(function(){
              resolve();
          })
          .catch(function(error){
              reject(error);
          });
      });
  }

  function solveQuestion(qLink) {
      return new Promise(function(resolve, reject){
      let questionGotoPromise= tab.goto(qLink);
      questionGotoPromise.then(function(){
          let waitAndClickPromise= waitAndClick("#Editorial");
          return waitAndClickPromise;
      })
      .then(function(){
          
      })
      })
  }