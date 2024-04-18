import resultService from "../service/resultService.js";
import quoteService from "../service/quotesService.js";
import booksService from "../service/booksService.js";
import resultView from "../view/resultView.js";


async function init(args) {
    console.log(args);
    const playlist = await resultService.get(args[0]);
    const quote = await quoteService.get(args[0]);
    const books = await booksService.get(args[0]);
   //const message = "37i9dQZF1DXdPec7aLTmlC";
    resultView.render(playlist.playlist_id, quote.quote, books);
    //resultView.render(message);
   
}

export default { init };