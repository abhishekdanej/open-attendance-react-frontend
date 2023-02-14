import { getUserFormattedDate } from "./Utilities";

export default function MyAtPane() {
    return (
        <>

            <div className="card mb-3">
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


                <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 badge bg-dark text-wrap">14 Feb 2023, Tuesday</h5>
                        <h5 className="mb-1 badge bg-primary text-wrap">Meeting</h5>
                        {/* <small class="text-muted">3 days ago</small> */}
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Meeting</span>: Implementation review at IDBI Bank. Implementation review at IDBI Bank.
                    </span>
                </div>

                <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 badge bg-dark text-wrap">13 Feb 2023, Monday</h5>
                        <h5 className="mb-1 badge bg-warning text-wrap">Remote</h5>
                        {/* <small class="text-muted">3 days ago</small> */}
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Remote</span>: SMAX VILT Training day 2.
                    </span>
                </div>

                <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 badge bg-dark text-wrap">12 Feb 2023, Monday</h5>
                        <h5 className="mb-1 badge bg-success text-wrap">Office</h5>
                        {/* <small class="text-muted">3 days ago</small> */}
                    </div>
                    <span className="mb-1">
                        {/* <span className="fw-bold">Office</span>: */}
                        SMAX VILT Training day 2.
                    </span>
                </div>

                <div className="list-group-item list-group-item-action mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 fs-6 badge bg-dark text-wrap">10 Feb 2023, Saturday</h5>
                        <h5 className="mb-1 fs-6 badge bg-success text-wrap">Remote</h5>
                        {/* <small class="text-muted">3 days ago</small> */}
                    </div>
                    <span className="mb-1">
                        <span className="fw-bold">Remote</span>:
                        {/* Gujarat gandhinagar visit, GSDC. */}
                    </span>
                </div>

                {/*
                <div className="list-group-item list-group-item-action">
                    <div class="d-flex flex-row align-items-center">
                        <div className="flex-grow-0 p-2 bg-dark ">
                            <span style={{ "color": "white" }}>
                                <span className="fs-3 fw-bold">24</span>
                                <br />
                                <small>Feb</small>
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
                                04-Feb<br />Wed
                            </span>
                        </div>
                        <div className="p-2 w-80">
                            <div className="d-flex justify-content-between">
                                <h5>Remote</h5>
                                <small class="text-muted">Wednesday</small>
                            </div>
                            &nbsp;
                            Implementation review at IDBI Bank which went well 
                        </div>
                    </div>
                </div>
                    */}

            </div>

        </>
    )
}