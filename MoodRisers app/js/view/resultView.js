const list = document.createElement("div");
  container.className = "bg-light";

  list.style = `display: flex`;
  list.className = `text-center`; 
 
  const item = document.createElement("div");
  const moodData = getCookie('logs');
  

function render(message) {


  


  const container = document.querySelector("#container");
  container.innerHTML = "";

 
      item.className = `col text-black bg-light mb-3" style="max-width: 18rem;`;
      item.innerHTML = `
      <div class="coverAll">
      <div class="space-top-bar">
      <button type="button" id="homeButton" class="btn btn-primary fixed-top-home">Home</button>
      <button type="button" id="moodHistoryButton" class="btn btn-primary fixed-top" data-bs-toggle="modal" data-bs-target="#chartModal">
      Mood History
    </button>
    </div>
  
      <iframe id="spotifyPlayer" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${message}?utm_source=generator&theme=0" width="50%" height="452" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  
    

     <!-- Modal -->
<div class="modal fade" id="chartModal" tabindex="-1" aria-labelledby="chartModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"> <!-- Changed modal-lg to modal-xl -->
    <div class="mood">
    <div class="moodGraph">
      <canvas id="moodChart"></canvas>
    </div>
    
  </div>
  
     
    

</div>

<button type="button" id="clearButton" class="btn btn-primary buttonClear">Clear History</button>

</div>


  </div>
  
 
  `;

      list.appendChild(item);
    

  container.appendChild(list);

if(!moodData) {
  document.getElementById('moodHistoryButton').style.display = 'none';
}


document.getElementById("clearButton").addEventListener('click', ()=> {
  clearCookie('logs');
});

function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=`;

  // Close the modal
  const modalBack = document.getElementsByClassName("modal-backdrop")[0];
  const modalDiv = document.getElementById('chartModal');
  modalDiv.parentNode.removeChild(modalDiv);
  modalBack.parentNode.removeChild(modalBack);

  // Hide the mood history button
  document.getElementById('moodHistoryButton').style.display = 'none';
}


  if (moodData) {
      const moodArray = JSON.parse(moodData).map(item => {
          const [timestamp, moodValue] = item.split('#');
          return { timestamp: parseInt(timestamp), moodValue: parseInt(moodValue) };
      });
      console.log(moodArray);

      populateGraph(moodArray);
  }
   
}


function populateGraph(data) {
  const ctx = document.getElementById('moodChart').getContext('2d');
  const labels = data.map(item => new Date(item.timestamp).toLocaleString());
  const values = data.map(item => item.moodValue);

  new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Mood',
            backgroundColor: '#700000',
            borderColor: '#700000',
            data: values,
            fill: false,
            pointBorderWidth: 3,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 30 // Adjust this value to fit the title properly
            }
        },
        scales: {
            y: {
                display: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Mood Rating'
                },
                max: 10
            },
            x: {
                display: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

}


function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
}

export default { render };