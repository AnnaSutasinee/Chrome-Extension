let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


// 2. Stack Overfolow How to get current active tab
tabBtn.addEventListener("click", function(){
  //chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
   // let activeTabs = tabs[0]
   //let activeTabId = activeTab.id; 
    //});
    //Grands access of the current active tabs in Chrome, pick only my current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //function will be triggered when Chrome found the tab we told Chrome to look for
    //gives us back a tabs variable
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    }) 
    
   
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})