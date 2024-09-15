<template>
    <BrandedContainer id="hero"
        class="!pt-36"
        >
        <div class="flex items-center flex-col mb-16">
            <h3 class="text-slate-400 font-bold text-5xl
                sm:text-6xl"
                >
                從設計到科技
            </h3>
            <h3 class="text-gradient
                mt-8 text-5xl
                sm:text-6xl"
                >
                創造不凡價值
            </h3>
            <p class="mt-10 text-slate-400/60 text-lg
                sm:text-xl"
                >
                平面設計 ｜ UI/UX設計 ｜ 網頁設計
            </p>
            <div class="flex flex-row gap-4 mt-12">
                <a class="button-pill
                    bg-secondary"
                    href="#service"
                    >
                    觀看更多
                </a>
                <a class="button-pill
                    bg-primary-600"
                    href="#contact"
                    >
                    與我聯絡
                </a>
            </div>
        </div>
        <ClientOnly>
            <BrandedBanner
                class="w-full rounded-2xl shadow-md"
                :banners=" banners "
                :timing=" bannerOption.timing "
                />
        </ClientOnly>
    </BrandedContainer>
    <BrandedContainer id="service">
        <h2 class="text-gradient font-title">
            服務項目
        </h2>
        <BrandedService
            title="平面設計"
            desc="CIS設計 ｜ VIS設計 ｜ LOGO設計 ｜ 商標設計 ｜ 名片設計 ｜ Office模板設計 ｜ 社群軟體模板設計 ｜ ICON設計 ｜ 廣告設計 ｜ 海報設計"
            :icons="[
                { name: 'illustrator' , src: '/service/icon/illustrator.png' },
                { name: 'photoshop' , src: '/service/icon/photoshop.png' },
                { name: 'indesign' , src: '/service/icon/indesign.png' }
            ]"
            image="/service/graphic.jpg"
            />
        <BrandedService
            title="UI/UX設計"
            desc="CIS設計 ｜ VIS設計 ｜ LOGO設計 ｜ 商標設計 ｜ 名片設計 ｜ Office模板設計 ｜ 社群軟體模板設計 ｜ ICON設計 ｜ 廣告設計 ｜ 海報設計"
            :icons="[
                { name: 'figma' , src: '/service/icon/figma.png' },
                { name: 'sketch' , src: '/service/icon/sketch.png' },
                { name: 'xd' , src: '/service/icon/xd.png' }
            ]"
            image="/service/uiux.jpg"
            />
        <BrandedService
            title="網頁設計"
            desc="CIS設計 ｜ VIS設計 ｜ LOGO設計 ｜ 商標設計 ｜ 名片設計 ｜ Office模板設計 ｜ 社群軟體模板設計 ｜ ICON設計 ｜ 廣告設計 ｜ 海報設計"
            :icons="[
                { name: 'jquery' , src: '/service/icon/jquery.png' },
                { name: 'vue' , src: '/service/icon/vue.png' },
                { name: 'nuxt' , src: '/service/icon/nuxt.png' },
                { name: 'tailwind' , src: '/service/icon/tailwind.png' },
                { name: 'sass' , src: '/service/icon/sass.png' },
                { name: 'bootstrap' , src: '/service/icon/bootstrap.png' },
                { name: 'd3' , src: '/service/icon/d3.png' }
            ]"
            image="/service/web.jpg"
            />
    </BrandedContainer>
    <BrandedContainer id="flow">
        <h2 class="text-gradient font-title">
            服務流程
        </h2>
        <p class="font-desc
            text-left text-slate-500
            lg:text-center"
            >
            服務流程服務流程服務流程服務流程服務流程服務流程服務流程服務流程服務流程服務流程
            <br class="hidden
                lg:block"
                >
            服務流程服務流程服務流程服務流程服務流程服務流程服務流程服務流程
        </p>
        <BrandedFlows
            :flows="[
                {
                    fontAwesomeIcon: 'fa-solid fa-comments',
                    title: '溝通諮詢',
                    items: [
                        '了解需求，討論最適合解，了解需求，討論最適合解',
                        '依項目提供合適報價'
                    ]
                },
                {
                    fontAwesomeIcon: 'fa-solid fa-briefcase',
                    title: '專案開始',
                    items: [
                        '了解需求，討論最適合解，了解需求，討論最適合解',
                        '依項目提供合適報價'
                    ]
                },
                {
                    fontAwesomeIcon: 'fa-solid fa-list-check',
                    title: '過稿/測試',
                    items: [
                        '了解需求，討論最適合解，了解需求，討論最適合解',
                        '依項目提供合適報價'
                    ]
                },
                {
                    fontAwesomeIcon: 'fa-solid fa-clipboard-check',
                    title: '驗收交付',
                    items: [
                        '了解需求，討論最適合解，了解需求，討論最適合解',
                        '依項目提供合適報價'
                    ]
                }
            ]"
            />
    </BrandedContainer>
    <BrandedContainer id="project">
        <h2 class="text-gradient font-title">
            專案項目
        </h2>
        <p class="font-desc
            text-left text-slate-500
            lg:text-center"
            >
            專案項目專案項目專案項目專案項目專案項目專案項目專案項目專案項目專案項目專案項目
            <br class="hidden
                lg:block"
                >
            專案項目專案項目專案項目專案項目專案項目專案項目專案項目專案項目
        </p>
        <BrandedProjectSwiper
            :projects=" projects "
            />
    </BrandedContainer>
    <BrandedContainer id="contact"
        class="!bg-slate-800"
        >
        <div class="w-full flex flex-col items-center gap-16
            lg:flex-row"
            >
            <div class="w-full pb-0 flex flex-col gap-10
                lg:w-1/2 lg:pb-8"
                >
                <h2 class="text-gradient font-title">
                    與我聯絡
                </h2>
                <p class="font-desc
                    text-left text-slate-200"
                    >
                    與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡與我聯絡
                </p>
                <div class="flex flex-row flex-wrap w-fit gap-5">
                    <BrandedContactLink
                        label="email"
                        image="/contact/email.svg"
                        href="mailto:bruceyudesign2021@gmail.com"
                        />
                    <BrandedContactLink
                        label="github"
                        image="/contact/github.svg"
                        href="https://github.com/BruceYuDesign/bruceyudesign"
                        target="_blank"
                        />
                    <BrandedContactLink
                        label="instagram"
                        image="/contact/instagram.svg"
                        href="https://www.instagram.com/bruce_yu_design/"
                        target="_blank"
                        />
                </div>
            </div>
            <form class="w-full grid grid-cols-1 gap-6 text-base
                sm:grid-cols-2
                lg:w-1/2"
                >
                <BrandedContactInput
                    id="contactName"
                    name="name"
                    type="text"
                    label="姓名"
                    placeholder="請輸入您的姓名"
                    v-model=" contact.name "
                    />
                <BrandedContactInput
                    id="contactCompany"
                    name="company"
                    type="text"
                    label="公司名稱"
                    placeholder="請輸入貴司名稱"
                    v-model=" contact.company "
                    />
                <BrandedContactInput
                    id="contactTel"
                    name="tel"
                    type="tel"
                    label="聯絡電話"
                    placeholder="請輸入聯絡電話"
                    v-model=" contact.tel "
                    />
                <BrandedContactInput
                    id="contactEmail"
                    name="email"
                    type="email"
                    label="信箱"
                    placeholder="請輸入您的信箱"
                    v-model=" contact.email "
                    />
                <BrandedContactTextarea
                    class="col-span-1
                    sm:col-span-2"
                    id="contactDetail"
                    name="detail"
                    rows="8"
                    label="需要服務的內容"
                    placeholder="有任何想法，都可以與我聯絡"
                    v-model=" contact.detail "
                    />
                <button id="contactSubmit"
                    class="grid place-items-center p-2 h-10 col-span-1 bg-primary-600 rounded transition
                    hover:bg-primary
                    sm:col-span-2"
                    @click=" sendEmail "
                    :disabled=" contactIsLoading "
                    type="button"
                    >
                    <span v-if=" !contactIsLoading "
                        class="text-white">                  
                        送出
                    </span>
                    <svg v-if=" contactIsLoading "
                        class="h-6 w-6 fill-white animate-spin"
                        viewBox="0 0 50 50"
                        >
                        <path d="M25,49a24.03363,24.03363,0,0,1-10.68759-2.51129,1.39137,1.39137,0,0,1-.59923-1.94015l1.12269-1.94376a1.365,1.365,0,0,1,1.77606-.557,18.99975,18.99975,0,0,0,27.3467-15.7869A1.36568,1.36568,0,0,1,45.32955,25h2.24422a1.39136,1.39136,0,0,1,1.38075,1.48606A24.03139,24.03139,0,0,1,25,49Z"/>
                    </svg>
                </button>
            </form>
        </div>
    </BrandedContainer>
</template>

<script setup>
    const { data } = await useFetch( '/api/branded/' )
    const {
        banners,
        bannerOption,
        projects
    } = data.value

    useHead({
        title: 'BRUCE YU DESIGN',
        meta: [
            { name: 'description' , content: '' },
            { name: 'og:title' , content: '' },
            { name: 'og:description' , content: '' },
            { name: 'og:image' , content: '' }
        ]
    })
</script>

<script>
    import 'microtip/microtip.css'
    import emailjs from '@emailjs/browser'
    import { contactVerify } from '~/verify/contact'
    import { usePopupStore } from '~/stores/popup'
    export default {
        data() {
            return {
                contact: {
                    name:    '',
                    company: '',
                    tel:     '',
                    email:   '',
                    detail:  ''
                },
                contactIsLoading: false
            }
        },
        methods: {
            async sendEmail() {
                const { setPopup } = usePopupStore()
                const { data } = contactVerify( this.contact )
                this.contactIsLoading = true
                emailjs.send( 'service_c4yhyue' , 'template_uq3szmn' , data , '48hEci00blM8bCx6h' )
                    .then( response => {
                        this.contact = {
                            name:    '',
                            company: '',
                            tel:     '',
                            email:   '',
                            detail:  ''
                        }
                        setPopup( 'email發送成功' , 'success' )
                    })
                    .catch( error => {
                        setPopup( 'email發送失敗' , 'danger' )
                    })
                    .finally( () => {
                        this.contactIsLoading = false
                    })
            }
        }
    }
</script>