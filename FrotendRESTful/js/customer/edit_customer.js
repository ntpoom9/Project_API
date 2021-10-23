const init = async () => {
    //! ดึง id || query string มา จาก URL
    let params = new URL(document.location).searchParams;
    let customer_id = params.get("customer_id");  //! แสดงค่าตาม id ดึงจาก URL
    if (customer_id) {   //! เช็คว่ามีไอดีไหม?
        try {
            const customer = await fetch("http://localhost:5000/apis/customer/" + customer_id,
                {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then((response) => {
                return response.json();  //!คอนเวิดให้อยู่ในรูปแบบ json
            });
            //set ค่าสำหรับ ที่จะแก้ฏ
            document.getElementById("customer_id").value = customer.customer_id;  //!show ค่าใน input id = customer_id
            document.getElementById("customer_name").value = customer.customer_name;  //!show ค่าใน input id = customer_name
            document.getElementById("phonenumber").value = customer.phonenumber; //!show ค่าใน input id = phonenumber
            document.getElementById("email").value = customer.email;  //!show ค่าใน input id = email
            document.getElementById("address").value = customer.address;  //!show ค่าใน input id = address

            //ลองเอารูปอกมา
            // const item = document.createElement("img");
            // item.className = "imgURL";
            // item.src = customer.imgURL;

        } catch (error) {    //! ตรวจสอบข้อยกเว้นในการที่จะแก้ไขข้อมูล
            alert(`customer ID:${customer_id} not found`)
        }
    } else {
        // alert(`customer ID is missing`);
    }
};

// แก้ไขข้อมูล อัพเดทข้อมูลใหม่
const edit = async () => {
    const customer_id = document.getElementById("customer_id").value; //! set ค่าใน input id="customer_id"
    if (customer_id) {  //! เช็คว่าไอดีตรงกันไหม?
        const params = {
            // id: document.getElementById("id").value,
            customer_name: document.getElementById("customer_name").value, //! set ค่าใน input id="customer_name"
            phonenumber: document.getElementById("phonenumber").value,  //! set ค่าใน input id="phonenumber"
            email: document.getElementById("email").value,             //! set ค่าใน input id="email"
            address: document.getElementById("address").value,         //! set ค่าใน input id="address"
        }; 

        const customer = await fetch("http://localhost:5000/apis/customer/" + customer_id,
            {
                method: "PUT", //! method เพื่อส่งค่าไป
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                //! เพิ่ม body แปลง json เป็น text เข้าไปใน DB
                body: JSON.stringify(params),  
            }
        ).then((response) => {    //! เมื่อเพิ่มข้อมูลไปแล้ว ส่งค่าไปในรูปแบบ json
            return response.json();
        }).then(() => {
            alert(`อัพเดทข้อมูลผู้ใช้ ไอดีผู้ใช้ที่ ${customer_id} เรียบร้อยแล้ว!`);
            window.location = './all_customer.html';
        });
    }
    else {  //! ถ้าไม่มีแสดงข้อความ ไม่พบ
        // alert(`customer ID is missing!`);
    }
}

init();
edit();