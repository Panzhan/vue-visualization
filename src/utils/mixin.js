import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import store from '@/store'
export default {
    model: {

    },
    props: {

    },
    data() {
        return {
        };
    },
    computed: {
        // 路由名称
        activeRouterTitle: ()=>{
            return store.state.activeRouterTitle
        },
        // path
        routePath: ()=>{
            return store.state.routePath
        },
        ...mapState('base', [
            'userInfo', // 用户信息
            'permissions', // 按钮级别权限
            'menuList', // 有权限菜单
            'allMenuList', // 所有菜单
            'pagePermissions', // 页面级别权限
        ]),
        // 过滤列表空数据，填充 ---
        filterRecordValue(){
            return (val)=>{
                if(val === 0 || val === '0') return 0
                return val || '---'
            }
        },
        // 处理不能访问的图片
        filterCoverImg(){
            return (val)=>{
                if(val.indexOf(",") == -1 ){
                    return 'https://images.weserv.nl/?url=' + val
                }else{
                    return 'https://images.weserv.nl/?url='+val.split(",")[0];
                }
            }
        },
        // order index/detail
        statusTxt() {
            return (val)=>{
                switch (val) {
                    case 0: 
                        return '未付款'
                    case 1: 
                        return '待鉴定'
                    case 2:
                    case 3:
                    case 4:
                        return '已完成'
                    case 5: 
                        return '待补图'
                    case 6: 
                        return '已关闭'
                    case 7: 
                        return '鉴定中'
                    default:
                        return '-'
                }
            }
        },
        // order index/detail
        typeTxt(){
            return (val)=>{
                switch (val) {
                    case 0: 
                        return '普通鉴定'
                    case 1: 
                        return '快速鉴定'
                    case 2: 
                        return 'AI鉴定'
                    default:
                        return '-'
                }
            }
        },
    },
    created() {
      
    },
    mounted() {
        
    },
    methods: {
        // file为上传的图片，可获取图片原始宽高
        getImgWideHigh(file)  {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.onload = (e)=> {
                    let data = e.target.result
                    let img = new Image()
                    img.src = data
                    img.onload = ()=> {
                        resolve({width: img.width,height: img.height})
                        console.log('width', img.width)
                        console.log('height', img.height)
                    }
                }
                reader.readAsDataURL(file)
            })
        }, 
        // 判断字符类型 
        CharMode(iN) {  
            if (iN >= 48 && iN <= 57) //数字    
                return 1;  
            if (iN >= 65 && iN <= 90) //大写字母    
                return 2;  
            if (iN >= 97 && iN <= 122) //小写    
                return 4;  
            else  
                return 8; //特殊字符    
        },
        // 统计字符类型 
        bitTotal(num) {  
            var modes = 0;  
            for (let i = 0; i < 4; i++) {  
                if (num & 1) modes++;  
                num >>>= 1;  
            }  
            return modes;  
        }
    }
};
