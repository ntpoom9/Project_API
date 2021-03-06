const init = async () => {     
    const allRestuarants = await fetch(
        "http://localhost:5000/apis/restaurants", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json()); //! แสดงรูปแบบเป็น json
    allRestuarants.forEach((element) => addRestaurants(element));  //! ส่งค่า element ไปยัง ฟังก์ชัน addRestaurants
}
const addRestaurants = (element) => {
    const item = document.createElement("div");   //!  สร้าง div card สำหรับนำข้อมูลมาโชว์
    item.className = "card"; //!  กำหนดชื่อ class
    //6-14 เป็นการกำหนด HTML มีการแทรก ข้อมูลลงไปด้วย
                                                //!  เรียกใช้ พารามิเตอร์ ตามชื่อ ฟิล
    const card = `    
    <img src="${element.imgURL}" class="card__img" alt="${element.name}">  
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text"><b>ประเภท: </b>${element.type}</p>
      <a href="#" class="btn btn-danger" onclick="deleteRestaurant(${element.id})">ลบ</a>
      <a href="edit_restaurant.html?id=${element.id}" class="btn btn-warning">แก้ไข</a>
    </div>
    `;
    item.innerHTML = card;  //!--  เอาไปแทรกที่card ลงใน div
    const restaurantsElement = document.querySelector(".restaurants"); //! เข้าถึง class restaurant หน้า HTML
    restaurantsElement.appendChild(item); //!-- เพิ่มลงไป
}

const removeAllResult = () => {
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.innerHTML = "";
}

const deleteRestaurant = async (id) => { //!-- รับไอดีที่ส่งมา
    if (id) { //! - เช็ค id
        try {
            const restaurant = await fetch(
                "http://localhost:5000/apis/restaurants/" + id, { //!-- ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
                method: "DELETE",          //DELETE
                mode: "cors",
                cache: "no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals: "same-origin",
                headers: {
                    "Content-type": "application/json"  //!-- ข้อมุลอยู่ในรูปแบบ json
                },
            }).then((response) => {
                return response.json();  //!-- ส่งค่าในรูปแบบ json
            }).then(() => {
                alert(`ลบข้อมูลร้านอาหาร ไอดีที่ ${id} เรียบร้อยแล้ว`); //!-- แสดง alter ว่าลบแล้ว
                location.reload(); //!-- load หน้าใหม่หลัง Delete
            }
            );
        } catch (error) {
            alert(`Restaurant id:${id} not found!!`);
        }
    } else {    //!-- id ไม่พบ จะแสดงข้อความ
        alert("Restaurant ID is missing")
    }
}