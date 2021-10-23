const init = async () => {
    
    let params = new URL(document.location).searchParams; //! ดึง id || query string มา จาก URL
    let id = params.get("id");   //! แสดงค่าตาม id 
    if (id) {     //! เช็คว่ามีไอดีไหม?
        try {
            const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
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
            document.getElementById("id").value = restaurants.id;  //!ให้ ค่าใน input id = id
            document.getElementById("name").value = restaurants.name;  //!ให้ ค่าใน input id = name
            document.getElementById("type").value = restaurants.type;   //!ให้ ค่าใน input id = type
            document.getElementById("imgURL").value = restaurants.imgURL;   //!ให้ ค่าใน input id = imgURL
            //ลองเอารูปอกมา
            // const item = document.createElement("img");
            // item.className = "imgURL";
            // item.src = restaurants.imgURL;
        } catch (error) {
            alert(`Restaurants ID:${id} not found`)
        }
    } else {
        // alert(`Restaurants ID is missing`);
    }
};

// แก้ไขข้อมูล อัพเดทข้อมูลใหม่
const edit = async () => {
    const id = document.getElementById("id").value; //! set ค่าใน input id="id"
    if (id) {  //! เช็คว่าไอดีตรงกันไหม?
        const params = {
            // id: document.getElementById("id").value,
            name: document.getElementById("name").value, //! set ค่าใน input id="name"
            type: document.getElementById("type").value, //! set ค่าใน input id="type"
            imgURL: document.getElementById("imgURL").value, //! set ค่าใน input id="imgURL"
        };

        const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
            {
                method: "PUT",  //! method เพื่อส่งค่าไป
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(params), //! เพิ่ม body แปลง json เป็น text เข้าไปใน DB
            }
        ).then((response) => {              //! เมื่อเพิ่มข้อมูลไปแล้ว จะแสดงข้อความ
            alert(`อัพเดทข้อมูลร้านอาหาร ไอดีร้านอาหารที่ ${id} เรียบร้อยแล้ว!`);
            window.location = './all_restaurant.html'; //! ให้แสดงหน้า all_restaurant.html
            return response.json(); //! พร้อมกับ ส่งค่ากลับเป็น json
        });
    }
    else {
        //   alert(`ไม่พบ ID ร้านอาหาร`);
    }
}

init();
edit();