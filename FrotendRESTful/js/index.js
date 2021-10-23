//แก้ไข ข้อมูล ผ่าน API(Postman)
const editRestaurants = async (id) => {
    if (id) {
        try {
            const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
                {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    return response.json();
                }).then(() => {
                    alert(`แก้ไขข้อมูลของ id:${id} เรียบร้อย`)
                    location.reload();
                });

        } catch (error) {
            alert(`ไม่มี id:${id}`)
        }
    } else {
        alert("ไม่มี id นะ")
    }
};


//ลบ ข้อมูล
const deleteRestaurants = async (id) => {
    if (id) {
        try {
            const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
                {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    return response.json();
                }).then(() => {
                    alert(`ลบ id:${id} ลบแล้วจ้า`)
                    location.reload();
                });

        } catch (error) {
            alert(`ไม่มี id:${id}`)
        }
    } else {
        alert("ไม่มี id นะ ius")
    }
};

//สร้าง div card สำหรับนำข้อมูลมาโชว์
const addRestaurant = (element) => {
    const item = document.createElement("div");
    item.className = "card";
    item.style = "width:20rem";

    const card = `
    <img src="${element.imgURL}" class="card-img-top" alt="${element.name}">
    <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text"><b>ประเภท: </b>${element.type}</p>
        <a href="#" class="btn btn-danger" onclick="deleteRestaurants(${element.id})">ลบ</a>
        <a href="edit.html?id=${element.id}" class="btn btn-warning" >แก้ไข</a>
    </div>`;
    item.innerHTML = card;
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.appendChild(item);


}

// ลบรูปเก่าที่ค้นหา
const removePre = () => {
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.innerHTML = "";

}
//ค้นหารูป
const searchRestaurants = async (event) => {  //!-- ประกาศตัวแปร searchRestaurants 
                                              //!-- เมื่อ async อยู่หน้าฟังก์ชัน จะต้องมี await
    const keyword = event.target.value;       //!-- ประกาศ keyword เท่ากับ พารามิเตอร์ event กำหนดไปที่ value
    if (event.key === "Enter" && keyword) {   //!-- ถ้า พารามิเตอร์ที่คีย์ ค่าชนิด ต้องตรงการ Enter และ คำ
        const allRestaurants = await fetch('http://localhost:5000/apis/restaurants', 
            {                                 //!-- ให้แสดงข้อมูลออกมา
                method: "GET",       
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json", //!-- Type เป็น json
                },
            }
        ).then((response) => {
            return response.json(); //!-- ส่งค่ากลับมาเป็นข้อมูล json
        }
        );
        // console.log(keyword);
        // console.log(allRestaurants);
        //! ค้นหา 2 อย่าง จากคำที่พิมมา
        const result = allRestaurants.filter(  //!-- ประกาศตัวแปร result = ตัวแปรที่เก็บค่ามาแสดง
            (item) => item.name.includes(keyword)  //!-- พารามิเตอร์ item ให้ค้าหาจาก name หรือ ค้นหาจาก type
            || item.type.includes(keyword)  
        );
        // console.log(result);
        
        removePre();                
        result.forEach((element) => addRestaurant(element)); 
                        //!ใช้ forEach ส่ง element ไป ในmetthod เพื่อสร้างข้อมูลออกมา
    }
}
const main = () => {  //!-- ประกาศ ฟังก์ชัน main 
    const inputElement = document.querySelector("#search")  //!-- return ค่าเป็น  node ที่ id search
    inputElement.addEventListener("keydown", searchRestaurants) //!-- ส่งข้อมูลไปที่ keydown ฟังก์ชัน searchRestaurants
};
main();
