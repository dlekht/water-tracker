const submitGoalBtn = document.getElementById("submitBtn");
const goalInput = document.getElementById("goalInput");
const submitContainer = document.getElementById("submitContainer");
const goalContainer = document.getElementById("goalContainer");
const progressText = document.getElementById("progressText");
const labelNumberOfGlasses = document.querySelector("label");
const progressBar = document.getElementById('progressBar');


const addGlassBtn = document.getElementById("addGlassBtn");
const glassesDisplay = document.getElementById("glassesDisplay");
const trackerContainer = document.getElementById("trackerContainer");

const resetBtn = document.getElementById("resetBtn");
let goal;
let counter = 0;
let progressPercentage = 0;

showDisplay(addGlassBtn, false);
showDisplay(resetBtn, false);
showDisplay(progressBar, false);



submitGoalBtn.addEventListener("click", event =>{
        goal = Number(goalInput.value);

        saveToLocalStorage('goal', goal);

        showDisplay(addGlassBtn, true);
        showDisplay(resetBtn, true);
        showDisplay(submitContainer, false);
        showDisplay(labelNumberOfGlasses, false);

        const goalDisplay = document.createElement("h1");
        goalDisplay.innerHTML = `${goal} Glasses`;
        goalDisplay.id = "goalDisplay";
        goalContainer.insertBefore(goalDisplay, labelNumberOfGlasses);


        goalInput.value = "";
    })


addGlassBtn.addEventListener("click", event => {
        counter++;
        
        saveToLocalStorage('counter', counter);

        const newGlass = document.createElement("div");
        newGlass.textContent = counter;
        newGlass.style.backgroundImage = "url('images/glassOfWater.png')";
        newGlass.className = "newGlass";
        glassesDisplay.append(newGlass);

        updateProgress();
    
});


resetBtn.addEventListener("click", reset);


function showDisplay(element, shouldShow) {
    element.style.display = shouldShow ? 'block' : 'none';
  }


function reset(){
    counter = 0;
    goal = 0;

    localStorage.clear()

    glassesDisplay.innerHTML = "";
    goalInput.value = "1";
    goalContainer.style.height = "auto";

    if (goalDisplay) {
      goalDisplay.remove();
    }

    showDisplay(submitContainer, true);
    showDisplay(labelNumberOfGlasses, true);
    showDisplay(addGlassBtn, false);
    showDisplay(resetBtn, false);
    showDisplay(progressBar, false);
    showDisplay(progressText, false);
}


function updateProgress() {
    const progressPercentage = (counter / goal) * 100;
    progressBar.value = counter;
    progressBar.max = goal;

    showDisplay(progressBar, true);
    showDisplay(progressText, true);
  
    if(progressPercentage < 100){
        progressText.textContent = `You drank ${counter} glasses out of ${goal}. Progress: ${progressPercentage.toFixed(2)}%  Keep up the good work!`;
        progressText.style.color = "hsl(210, 100%, 45%)";
    } else if(progressPercentage === 100){
        progressText.textContent = `You've reached your goal! Congratulations!`
        progressText.style.color = "green";
    } else {
        progressText.textContent = `You are going above your goal! You drank ${counter} glasses out of ${goal}. Which is ${progressPercentage.toFixed(2)}% of your goal. Make sure, that you don't overhydrate!`
        progressText.style.color = "red";
    }
    progressText.style.fontWeight = "bold";
    
}


// local storage

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
  

document.addEventListener('DOMContentLoaded', () => {
    const savedGoal = loadFromLocalStorage('goal');
    const savedCounter = loadFromLocalStorage('counter');
  
    if (savedGoal) {
      goal = savedGoal;
      counter = savedCounter || 0;
  
      
      restoreUI();
    }
});

function restoreUI() {
    showDisplay(submitContainer, false);
    showDisplay(addGlassBtn, true);
    showDisplay(resetBtn, true);
    showDisplay(labelNumberOfGlasses, false);
  
    const goalDisplay = document.createElement("h1");
    goalDisplay.id = "goalDisplay";
    goalDisplay.innerHTML = `${goal} Glasses`;
    goalContainer.insertBefore(goalDisplay, labelNumberOfGlasses);
  
    
    progressBar.value = counter;
    progressBar.max = goal;
  
    for (let i = 1; i <= counter; i++) {
      const newGlass = document.createElement("div");
      newGlass.textContent = i;
      newGlass.className = "newGlass";
      glassesDisplay.append(newGlass);
    }
  
    updateProgress();
}
