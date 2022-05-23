import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AdminService from '../../Services/AdminService';
import BookService from '../../Services/BookService';
import NavbarHomeAdmin from './NavbarHomeAdmin';
import Card from 'react-bootstrap/Card'
import React, { useEffect, useMemo, useState } from "react";
import './AddBook.css'
const EditBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookid = localStorage.getItem("bookid")

    // console.log("bookid is:", bookid)
    const test = () => {
        const res = BookService.getContent(bookid)
        console.log("result after api call", res)
        BookService.getContent(bookid).then((res) => {
            console.log(res.data.title);
            // const id = localStorage.getItem("id")
            dispatch({ type: "books", value: res.data })
        })

    }

    useEffect(() => {
        test();
    }, [])

    useEffect(() => {
        const localData = localStorage.getItem("token")
        // console.log(localData)
        if (localData == null) {
            navigate("/")
        }
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const bookData = {
            img: img,
            title: title,
            author: author,
            content: content,
            summary: summary,
            category: category,
            likes_count: likes_count
        }
        console.log("bookData to edit is", bookData)

        // AdminService.editBookbyAdmin(bookData, bookid).then((res) => {
        //     console.log("Results are=", res);
        //     if (res.status == 200) {
        //         navigate("/homeAdmin");
        //     }
        // })
    }

    const { books } = useSelector((state) => state);
    const [t, settitle] = useState(books.title)

    // settitle(books.title)
    const { author, title, content, summary, category, img, likes_count } = useSelector((state) => state)
    console.log("title t:", t)
    console.log("book is", books)
    return (
        <div>
            <NavbarHomeAdmin />
            <div className="container ">
                <h1> Edit this  Book</h1>
                <Card style={{ width: '50rem', height: '46.5rem', padding: '1.5rem' }} className="card-class">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                name="author"
                                id="author"
                                className="form-control"
                                placeholder="Enter author"
                                value={books.author}
                                onChange={(e) => dispatch({ type: 'author', value: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="img">Enter image url:</label>
                            <input
                                type="img"
                                name="img"
                                id="img"
                                className="form-control"
                                placeholder="Enter img"
                                value={books.img}
                                onChange={(e) => dispatch({ type: 'img', value: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="title"
                                name="title"
                                id="title"
                                className="form-control"
                                placeholder="Enter title"
                                value={t}
                                onChange={(e) => { settitle(e.target.value); dispatch({ type: 'title', value: e.target.value }) }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="category"
                                name="category"
                                id="category"
                                className="form-control"
                                placeholder="Enter category"
                                value={books.category}
                                onChange={(e) => dispatch({ type: 'category', value: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="likes_count">Likes Count</label>
                            <input
                                type="likes_count"
                                name="likes_county"
                                id="likes_count"
                                className="form-control"
                                value={books.likes_count}
                                onChange={(e) => { dispatch({ type: 'likes_count', value: e.target.value }) }}
                                required
                            />
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="summary">Summary</label>
                            <input
                                type="summary"
                                name="summary"
                                id="summary"
                                className="form-control"
                                placeholder="Enter summary"
                                value={books.summary}
                                onChange={(e) => dispatch({ type: 'summary', value: e.target.value })}
                            /> */}
                            <label htmlFor="summary">Summary</label>

                            <textarea id="summary" name="summary" className="form-control" placeholder="Enter summary" value={books.summary} onChange={(e) => dispatch({ type: 'summary', value: e.target.value })} rows="2" cols="50">

                            </textarea>
                        </div>
                        <div className="form-group">
                            {/* <label htmlFor="content">Content</label>
                            <input
                                type="content"
                                name="content"
                                id="content"
                                className="form-control"
                                placeholder="Enter content"
                                value={books.content}
                                onChange={(e) => dispatch({ type: 'content', value: e.target.value })}
                                required
                            /> */}
                            <label htmlFor="content">Content</label>

                            <textarea id="content" name="content" className="form-control" placeholder="Enter Content" value={books.content} onChange={(e) => dispatch({ type: 'content', value: e.target.value })} rows="6" cols="50">

                            </textarea>
                        </div>





                        <div className='form-group'>
                            <input type="submit" value="Update Book" className='btn btn-info' />
                        </div>

                    </form>
                </Card>
                <br /><br /><br />
            </div>

        </div>

    );
};
export default EditBook;