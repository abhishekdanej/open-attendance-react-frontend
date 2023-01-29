import { useEffect, useState } from "react";

export default function AttendanceCard(value) {


    
    if (value) {

        console.log("Got Object: " + value['value'].length);
    
        // console.log("Got list: " + JSON.stringify(value));
        // const obj = JSON.parse(JSON.stringify(value))['value'];
        // console.log("List length: " + obj.length);
    
        var officeList = []; 
        var meetingList = []; 
        var anywhereList = []; 
    
        var list = value['value'];
        for(const item of list) {
            console.log("checking: " + JSON.stringify(item));
            if(item.WorkLocation==='Office'){ 
                officeList.push(item);
            }
            if(item.WorkLocation==='Anywhere'){ 
                anywhereList.push(item);
            }
            if(item.WorkLocation==='Meeting'){ 
                meetingList.push(item);
            }
        }
    
        console.log("Office list size: " + officeList.length);
    }

    return (


        < div class="card text-bg-light mb-3"  >
            <h5 class="card-header">Mumbai</h5>

            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success fw-semibold">Office
                    <span class="badge bg-primary rounded-pill">{officeList.length}</span>
                </li>
                <li class="list-group-item fs-5">Person A</li>
                <li class="list-group-item fs-5">A third item</li>

                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success fw-semibold">Meeting
                    <span class="badge bg-primary rounded-pill">{meetingList.length}</span>
                </li>
                <li class="list-group-item fs-5">A second item</li>
                <li class="list-group-item fs-5">A third item</li>
                
                <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-success fw-semibold">Anywhere
                    <span class="badge bg-primary rounded-pill">{anywhereList.length}</span>
                </li>
                <li class="list-group-item fs-5">A second item</li>
                <li class="list-group-item fs-5">A third item</li>


            </ul>

        </div >
    );
}