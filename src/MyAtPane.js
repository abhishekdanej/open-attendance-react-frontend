import { getUserFormattedDate } from "./Utilities";

export default function MyAtPane() {
    return (
        <>

            <div className="card">
                <img src="img1.jpg" className="card-img-top" alt="Group of friends" />
                <div className="card-body">
                    <h5 className="card-title">Coming Soon</h5>
                    <p className="card-text">History of your work location (visible to you only).</p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>

            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action ">
                    <div class="d-flex w-100 justify-content-between">
                        {getUserFormattedDate()}
                        <h5 class="mb-1">Meeting</h5>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small>3 days ago</small>
                    </div>
                    {/* <p class="mb-1">Some placeholder content in a paragraph.</p> */}
                    {/* <small>And some small print.</small> */}
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                    <div className="row">
                        <div className="col-auto">
                            {getUserFormattedDate()}
                        </div>
                        <div className="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">Remote</h5>
                                <small class="text-muted">3 days ago</small>
                            </div>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small class="text-muted">And some muted small print.</small>
                        </div>
                    </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">Office</h5>
                        <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">Some placeholder content in a paragraph.</p>
                    <small class="text-muted">And some muted small print.</small>
                </a>

                <div className="list-group-item list-group-item-action">
                    <div class="d-flex flex-row align-items-center">
                        <div className="flex-grow-0 p-2 bg-dark ">
                            <span style={{ "color": "white" }}>
                                24-Feb<br/>Sun
                            </span>
                        </div>
                        <div className="p-2 w-80">
                            <div className="d-flex justify-content-between">
                                <h5>Meeting</h5>
                                <small class="text-muted">Sunday</small>
                            </div>
                            Implementation review at IDBI Bank
                        </div>
                    </div>
                </div>

                <div className="list-group-item list-group-item-action">
                    <div class="d-flex flex-row align-items-center">
                        <div className="flex-grow-0 p-2 bg-dark">
                            <span style={{ "color": "white" }}>
                                04-Feb<br/>Wed
                            </span>
                        </div>
                        <div className="p-2 w-80">
                            <div className="d-flex justify-content-between">
                                <h5>Remote</h5>
                                <small class="text-muted">Wednesday</small>
                            </div>
                            &nbsp;
                            {/* Implementation review at IDBI Bank which went well */}
                        </div>
                    </div>
                </div>

  
            </div>

        </>
    )
}