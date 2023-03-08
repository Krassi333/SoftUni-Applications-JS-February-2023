import { html } from '../../node_modules/lit-html/lit-html.js'
import { addLike, deleteBook, getAllLikes, getBookDetails, getMyLikes } from '../data.js'

const template = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            ${bookControlTemplate(book, isOwner, onDelete)}

            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${likeControlTemplate(showLikeButton, onLike)}

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`

const bookControlTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
`
    } else {
        return null
    }
}

const likeControlTemplate = (showLikeButton, onLike) => {
    debugger
    if (showLikeButton) {
        return html`
        <a class="button" @click=${onLike} href="javascript:void(0)">Like</a>
        `
    } else {
        return null
    }
}



export async function detailsView(ctx) {
    console.log('details');
    //debugger
    let user = JSON.parse(localStorage.getItem('user'));
    let bookId = ctx.params.id;

    let [book, likes, hasLike] = await Promise.all([
        getBookDetails(bookId),
        getAllLikes(bookId),
        getMyLikes(bookId)
    ])

    let isOwner = false;
    let showLikeButton = false;

    if (user) {
        if (user._id == book._ownerId) isOwner = true;
        if (!isOwner && hasLike == 0) showLikeButton = true;
    }

    ctx.render(template(book, isOwner, onDelete, likes, showLikeButton, onLike))


    async function onDelete(bookId) {
        await deleteBook(bookId);
        ctx.page.redirect('/');
    }

    async function onLike(bookId) {
        debugger
        
        await addLike(bookId);
        ctx.page.redirect(`/details/`+ctx.params.id)
    }

}



