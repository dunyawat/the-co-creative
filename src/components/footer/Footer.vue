<template>
    <div>
        <div class="footer-logo">
            <img src="@/assets/images/logo-big.png" width="292" height="27" alt="logo">
        </div>
        <div class="px-4 footer-content">
            <div class="row m-0">
                <div class="col-lg-4 p-0 mb-3 mb-lg-0 text-capitalize">@2023 The Co-Creative Co.,Ltd  <br> All Right Reserved.</div>
                <div class="col-lg-4 p-0 ps-md-1 mb-5 mb-lg-0">
                    Pu Hai Properties Building<br> 
                    1974/1 Room 202, New Petchaburi Rd,<br> 
                    Bang Kapi, Huai Khwang, Bangkok 10320
                    <div class="footer-link">
                        <a href="tel:+66989296523">(66) 098-929-6523</a>
                        <a href="https://www.instagram.com/theco_creative/">Instagram</a>
                        <a href="mailto:hello@the-cocreative.com">hello@the-cocreative.com</a>
                    </div>
                </div>
                <div class="col-lg-4 p-0  ps-md-2">
                    <div>
                        Thank you for looking through our projects, <br> We looking forward to working with you.
                    </div>
                    <div class="link-inquiries">
                        <div class="mb-2">
                            Please reach out for work inquiries.
                        </div>
            
                        <div class="line-hover" @click="router.push({name:'ClientViewUrl'})">
                            <img class="image-line" src="@/assets/images/line-new.svg" alt="logo">
                            <img class="image-line-long" src="@/assets/images/long.png" alt="logo">
                            <img src="@/assets/images/arrow.svg" style="margin-left:-12px; margin-right:5px" alt="logo">
                            New Client Inquiries
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name:'Footer',
    setup() {
        const router = useRouter()

        return{
            router
        }
    },
}
</script>

<style>
    .text-capitalize{
        text-transform: capitalize;
    }

    .footer-logo{
        margin-top: 60px;
        border-top: 0.25px solid #000;
        border-bottom: 0.25px solid #000;
        padding: 30px 0;
        text-align: center;
    }

    .footer-content{
        padding-top: 30px;
        font-size: 14px;
        line-height: 20px;
        color: #000;
        padding-bottom: 45px;
    }

    .footer-link{
        margin-top: 20px;
    }

    .footer-link a{
        display: block;
        color: #000;
    }

    .footer-link a:hover{
        color: #000;
        text-decoration: underline;
    }

   .link-inquiries{
       margin-top: 40px;
   }

    @media (max-width: 991.98px) { 
        .link-inquiries{
            margin-top: 15px;
        }
    }

    .line-hover .image-line-long{
        display: none;
    }
    .line-hover:hover  {
        cursor: pointer;
    }
    .line-hover:hover .image-line-long{
        display: inline;
    }

    .line-hover:hover .image-line{
        display: none;
    }

</style>