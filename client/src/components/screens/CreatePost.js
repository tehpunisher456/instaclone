import React from "react"

const CreatePost = () => {
    return (
        <div className="card input-filed"
            style={{
                maxWidth: "500px",
                margin: "10px auto",
                padding: "20px",

            }}>

            <div className="form-group">

                <form>
                    {/*Upload Button*/}
                    <div className="file-field input-field">
                        <p>Upload photo of your product</p>
                        <div className="btn red accent-4">
                            <span>File</span>
                            <input type="file" className="form-control-file input-field" />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>

                {/*file uplaod with bootstrap*/}
                    {/* <form>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Example file input</label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                        </div>
                    </form> */}

                    <h2>Product Details</h2>
                    <div className="input-field">
                        <input type="text" className="form-control" placeholder="Brand Name" />
                        <input type="text" className="form-control" placeholder="size" />
                        <input type="text" className="form-control" placeholder="Price (ex: $20.00)" />
                        <textarea id="textarea1" className="materialize-textarea input-field" placeholder="description"></textarea>
                    </div>


                    <button className="btn btn-primary mb-2 red accent-4">
                        Submit Post
            </button>

                </form>
            </div>


        </div>
    )

}

export default CreatePost;