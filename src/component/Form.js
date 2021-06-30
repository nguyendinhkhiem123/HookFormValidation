import React  from 'react';
import './Form.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    name : yup.string().required("Không được bỏ trống"),
    email : yup.string().email("Phải có dấu tên và đến @").required("Không được bỏ trống"),
    age : yup.number("Đây phải là số").typeError("Không được bỏ trống").positive("Phải là số dương").integer("Tuổi phải là số nguyên").min(5, "Nhỏ nhất là 5" ).max(10,"Lớn nhất là 10"),
    username : yup.string().required("Không được bỏ trống"),
    password : yup.string().required("Không được bỏ trống").min(4,"Độ dài tối thiểu là 4").max(16 , "Độ dài tối đa là 16"),
    passwordagain : yup.string().required("Không được bỏ trống").oneOf([yup.ref("password")], "Mật khẩu nhập lại không trùng"),
    image : yup.mixed().required("Không được bỏ trống")
    
})
function Form(props) {
  
 
    const { register , handleSubmit ,watch, formState : {errors} } = useForm({
        resolver : yupResolver(schema)
    });

    const fileList = watch("image");  // Theo dõi file input file 
    console.log(fileList);
    if(fileList && fileList.length > 0 ){
        const file = fileList[0];
        document.getElementById('image').src = URL.createObjectURL(file);
        
    }
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const onSubmit =async (data) =>{
        console.log(data);
        const image = data.image[0];
        const base64Image = await toBase64(image);
        
        const dataTemp = {...data}

        dataTemp.image = base64Image;
        console.log(dataTemp)
    }
   
    return (
       <div className="modal">
           <div className="modal-overlay">
           </div>
           <div className="modal-body">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-heading">
                    <h3 className="heading">Thông tin người dùng</h3>
                </div>
                <div class="form-group">
                    <div className="form-label">Họ và tên</div>
                    <input type="text" class="form-control" placeholder="Nhập họ và tên" {...register("name")}/>
                    <div className="form-message">
                        <i>{errors.name && errors.name.message}</i></div>
                </div>
                <div class="form-group">
                    <div className="form-label">Địa chỉ Email</div>
                    <input type="text" class="form-control" placeholder="Nhập địa chỉ Email"  {...register("email")}/>
                    <div className="form-message">
                        <i>{errors.email && errors.email.message}</i>
                    </div>
                </div>
                <div class="form-group">
                    <div className="form-label">Tuổi</div>
                    <input type="number"  class="form-control"  defaultValue="1" placeholder="Nhập tuổi" {...register("age")} />
                    <div className="form-message">
                        <i>{errors.age && errors.age.message}</i>

                    </div>
                </div>
                <div class="form-group">
                    <div className="form-label">Tên tài khoản</div>
                    <input type="text"  class="form-control" placeholder="Nhập tên tài khoảng" {...register("username")}/>
                    <div className="form-message">
                         <i>{errors.username && errors.username.message}</i>
                    </div>
                </div>
                <div class="form-group">
                    <div className="form-label">Nhập mật khẩu</div>
                    <input type="password" class="form-control" placeholder="Nhập mật khẩu"  {...register("password")}/>
                    <div className="form-message">
                        <i>{errors.password && errors.password.message}</i>
                    </div>
                </div>
                <div class="form-group">
                    <div className="form-label">Xác nhận lại mật khẩu</div>
                    <input type="password"   class="form-control" placeholder="Xác nhận lại mật khẩu" {...register("passwordagain")} />
                    <div className="form-message">
                      <i>{errors.passwordagain && errors.passwordagain.message}</i>
                    </div>
                </div>
                <div class="form-group">
                    <div className="form-label">FIle</div>
                    <input type="file" accept="image/*"  placeholder="Xác nhận lại mật khẩu" {...register("image")} />
                    <div className="form-message">
                      <i>{errors.image && errors.image.message}</i>
                    </div>
                    <div>
                        <img id="image" style={{width:"40px" , height:"50px"}}></img>
                    </div>
                </div>
                <div class="form-group form-submit">
                    <button type="submit" className="form-submit__btn">Thêm</button>
                </div>
             </form>
           </div>
       </div>
    );
}

export default Form;