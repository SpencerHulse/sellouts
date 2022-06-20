const NewItem = () => {
    return (
        <div className="fullpage bg-tint">
            <div className="container">
                <div className="row">
                    <div className="mt-5 dialog">
                        <form>

                            <div className="dialog-section">
                                <h2 className="fw-light">Title</h2>
                                <p className="description">
                                    A short title that will be displayed throughout your online store
                                </p>
                                <label htmlFor="title" className="d-none">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="Item Title"
                                    className="default-input"
                                />
                            </div>
                            <div className="dialog-section">
                                <h2 className="fw-light">
                                    Item photos
                                </h2>
                                <input type="file" id="photo" />
                            </div>
                            <div className="dialog-section">
                                <h2 className="fw-light">
                                    Item Details
                                </h2>
                                <p className="description"></p>
                                <div>
                                    <label htmlFor="short-description">Short description</label>
                                    <textarea
                                        id="short-description"
                                        name="short-description"
                                        type="text"
                                        required
                                        maxLength="200"
                                        placeholder="Write a short description of your item. Max. 200 characters."
                                        className="default-input"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="long-description">Full description</label>
                                    <textarea
                                        id="long-description"
                                        name="long-description"
                                        type="text"
                                        required
                                        rows="6"
                                        placeholder="Write a short description of your item. Max. 200 characters."
                                        className="default-input"
                                    />
                                </div>
                            </div>

                            <div className="dialog-section">
                                <h2 className="fw-light">Pricing</h2>
                                <div className="dialog-subsection">
                                    <div className="row">
                                        <div className="col">
                                            <h4 className="fw-light">Regular price</h4>
                                            <div className="price-input-group d-flex">
                                                <div className="currency">$</div>
                                                <input className="price-input" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h4 className="fw-light">Sale price</h4>
                                            <div className="price-input-group d-flex">
                                                <div className="currency">$</div>
                                                <input className="price-input" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="default-button button-filled">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewItem;