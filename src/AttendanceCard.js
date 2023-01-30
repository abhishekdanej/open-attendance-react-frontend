export default function AttendanceCard(value) {

    
    var officeList = [];
    var meetingList = [];
    var anywhereList = [];

    if (value) {

        console.log("Got Object: " + value['value'].length);
        // setAtList(value['value']);
        // console.log("Got list: " + JSON.stringify(value));
        // const obj = JSON.parse(JSON.stringify(value))['value'];
        // console.log("List length: " + obj.length);


        var list = value['value'];
        for (const item of list) {
            console.log("checking: " + JSON.stringify(item));
            if (item.WorkLocation === 'Office') {
                officeList.push(item);
            }
            if (item.WorkLocation === 'Anywhere') {
                anywhereList.push(item);
            }
            if (item.WorkLocation === 'Meeting') {
                meetingList.push(item);
            }
        }

        //  <li class="list-group-item fs-5">Person A</li>
        
        console.log("Office size",officeList.length,", Anywhere size:", anywhereList.length, ", Meeting size:", meetingList.length);
    }

    const officeListItems = officeList.map(record =>
        <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
    );
    const anywhereListItems = anywhereList.map(record =>
        <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
    );
    const meetingListItems = meetingList.map(record =>
        <li key={record.SK} className="list-group-item fs-5">&nbsp;&nbsp;&nbsp;{record.SK}</li>
    );

    return (

        < div class="card text-bg-primary mb-3"  >
            <h5 class="card-header fs-3">India</h5>

            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Office
                    <span class="badge bg-primary rounded-pill">{officeList.length}</span>
                </li>
                {officeListItems}

                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Meeting
                    <span class="badge bg-primary rounded-pill">{meetingList.length}</span>
                </li>
                {meetingListItems}

                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item fs-4 fw-semibold">Anywhere
                    <span class="badge bg-primary rounded-pill">{anywhereList.length}</span>
                </li>
                {anywhereListItems}

            </ul>

        </div >
    );
}