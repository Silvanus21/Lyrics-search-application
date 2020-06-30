const apiUrl = "https://api.lyrics.ovh"
const form = document.querySelector("#form")
const search = document.querySelector("#search")
const result = document.querySelector("#result")
const more = document.querySelector("#more")

//function for searching song
async function searchSong(term) {
    // fetch(`${apiUrl}/suggest/${term}`)
    // .then(res => res.json())
    // .then(data => console.log(data))

    const res = await fetch(`${apiUrl}/suggest/${term}`)
    const data = await res.json()

    showData(data)
}

function showData(data) {
    // using forEach method

    // let output = ""

    // data.data.forEach(song => {
    //     output += `
    //     <li>
    //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    //     <button class="btn" data-artist = "${song.artist.name}" data-song = "${song.title}">Get lyrics</button>
    //     </li>
    //     `
    // })

    // result.innerHTML = 
    // `<ul class= "songs">
    //    ${output}
    // </ul>`

    //using map method


    result.innerHTML =
    `<ul class="songs">
        ${data.data.map(song => `<li>
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-song="${song.title}">Get lyrics</button>
        </li>` )
        .join("")    
    }    
    </ul>`

    if(data.next || data.prev){
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick = "getMoreSongs('${data.prev}')"> Prev </button>` : ""}
        ${data.next ? `<button class="btn" onclick = "getMoreSongs('${data.next}')"> Next </button>` : ""}
        `
    }
    else{
        more.innerHTML = ""
    }
}

// for prev and next songs list
async function getMoreSongs(link) {
    const res = await fetch(`http://cors-anywhere.herokuapp.com/${link}`)
    const data = await res.json()

    showData(data)
}


//function for getting lyrics
async function getLyrics(artist, song){
    const res = await fetch(`${apiUrl}/v1/${artist}/${song}`)
    const data = await res.json()

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>"
    )

    result.innerHTML = `<h2><strong>${artist} - ${song}</strong></h2>
    <span>${lyrics}</span>`

    more.innerHTML = ""
}


//event listener
form.addEventListener("submit", event => {
    event.preventDefault()

    const searchTerm = search.value.trim()

    if (!searchTerm) {
        alert("Please type in a search term")
    }
    else {
        searchSong(searchTerm)
    }
})


// get lyrics on button click

result.addEventListener("click", (event) => {
   const clickedElement = event.target


   if (clickedElement.tagName === "BUTTON"){
       const artist = clickedElement.getAttribute("data-artist")
       const song = clickedElement.getAttribute("data-song")

   getLyrics(artist, song)
    }
})