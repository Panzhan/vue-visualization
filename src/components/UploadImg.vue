<template>
    <div class="clearfix" :class="classname">
        <!-- <div v-if="imgSize" class="img_size">
            (上传图片不超过{{ imgSize / 1024 }}M)
        </div> -->
        <a-upload
            :listType="listType"
            :beforeUpload="beforeUpload"
            :customRequest="handleUpload"
            :showUploadList="
                disabled
                    ? { showRemoveIcon: false, showPreviewIcon: false }
                    : showUploadList
            "
            :fileList="fileList"
            :disabled="disabled"
            @change="handleChange"
            @preview="previewImg"
        >
            <slot>
                <div
                    v-if="fileList.length < max && listType === 'picture-card'"
                >
                    <a-icon type="plus" />
                    <div class="ant-upload-text">上传图片</div>
                </div>
                <a-button v-if="listType === 'text'">
                    <a-icon type="upload" />上传图片
                </a-button>
            </slot>
        </a-upload>
        <div class="img_rules">
            <div v-if="supportImgType" class="suport_text">只支持 {{ supportImgType }} 格式图片</div>
            <div v-if="memorySize" class="suport_text">只支持不超过 {{memorySize}} 大小的图片</div>
            <div v-if="pixelSize.length" class="suport_text">
                <span>只支持 {{ pixelSize[0] }} 尺寸图片</span>
                <span v-if="pixelSize.length && pixelSize.length>1">,最小尺寸 {{pixelSize[1]}} </span>
            </div>
        </div>

    </div>
</template>
<script>
import { uploadImg } from "@/api/common";
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
        callback(reader.result.split(",")[1])
    );
    reader.readAsDataURL(img);
}

export default {
    props: {
        /**
         * 类名 classname 用于重置样式
         */
        classname: {
            type: String,
            required: false,
            default: "",
        },
        /**
         * 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card
         */
        listType: {
            type: String,
            required: false,
            default: "text",
        },
        /**
         * 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon 和 showRemoveIcon
         */
        showUploadList: {
            type: Boolean,
            required: false,
            default: true,
        },
        /**
         * 接受一个数组，用于上传列表渲染
         */
        value: {
            type: [Array, String],
            required: false,
            default: () => [],
        },
        /**
         * 最大上传数量
         */
        max: {
            type: Number,
            required: false,
            default: 1,
        },
        /**
         * 限制上传图片大小
         */
        // imgSize: {
        //     type: Number,
        //     required: false,
        //     default: null,
        // },
        /**
         * 如果value 为String，并用符号分割，可以用此属性做处理。
         */
        symbol: {
            type: String,
            required: false,
            default: undefined,
        },
        // 禁止上传
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        // 图片类型
        supportImgType:{
            type: String,
            default: () => '',
        },
        // 像素尺寸
        pixelSize: {
            type: Array,
            default: () => [],
        },
        // 限制上传图片大小
        memorySize:{
            type: String | Number,
            default: () => '',
        }
    },
    data() {
        return {
            fileList: [],
        };
    },
    computed:{
        imgSize(){
            return this.memorySize && this.memorySize.split('kb')[0]
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        value: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.init();
            }
        },
    },
    methods: {
        previewImg(file) {
            this.$emit("previewImg", file.url);
        },
        init() {
            let { value, symbol } = this;
            // 处理接受数据和分发
            if (Array.isArray(value)) {
                this.initFileList(value);
            } else if (typeof value === "string") {
                if (symbol) {
                    this.initFileList(value.split(symbol));
                } else if (value.indexOf(",") > -1) {
                    this.initFileList(value.split(","));
                } else {
                    // value 是string类型，没有Symbol处理时，为单张图片
                    this.fileList = [];
                    if (value) {
                        this.initFileList(['https://images.weserv.nl/?url='+value]);
                    }
                }
            }
        },
        initFileList(arr) {
            arr.forEach((item, index) => {
                let temp = {
                    uid: index,
                    status: "done",
                    name: item,
                    url: item,
                };
                this.fileList.push(temp);
            });
        },
        beforeUpload(file) {
            const IsPic = file.type.indexOf("image/") != -1;
            if (!IsPic) {
                this.toast("请上传图片", "error");
                return false;
            }
            if (this.fileList.length >= this.max) {
                this.toast("你已达到最大上传数量", "error");
                return false;
            }
            if (this.imgSize && file.size/1024 > this.imgSize) {
                // 判断上传图片是否超出大小
                this.toast(
                    `当前图片${this.percentNum(file.size, 1024)}kb,超过最大限制${this.imgSize}kb`,
                    "error"
                );
                return false;
            }
            // 上传之前
            file.status = "uploading";
            this.fileList.push(file);
        },
        percentNum(denominator,molecular) {
            return parseFloat((denominator / molecular).toFixed(1)); //小数点后两位百分比
        },
        handleChange(info) {
            // 上传状态修改回调
            if (info.file.status === "removed") {
                this.fileList = info.fileList;
                this.deliveryData();
            }

            if (info.file.status === "done") {
                this.deliveryData();
            } else if (info.file.status === "error") {
                window.console.error("上传失败");
            }
        },
        deliveryData() {
            let imgList = [];
            this.fileList.forEach((item) => {
                imgList.push(item.url);
            });
            this.fileList = [];

            /**
             * 如果按字符串处理 则按字符串返回
             */
            if (this.symbol && this.max > 1) {
                imgList = imgList.join(this.symbol);
            }

            /**
             * 返回一个组数
             */
            if (this.max === 1) {
                this.$emit("change", imgList[0]);
                // 一张图片的时候 添加双向绑定V-model
                this.$emit("input", imgList[0]);
            } else {
                this.$emit("input", imgList);
                this.$emit("change", imgList);
            }
        },
        handleUpload(data) {
            let { uid, name, status } = data.file;
            let _ = this;
            let temp = { uid, name, status };
            // 图片转base64
            const formData = new FormData();
            formData.append("file", data.file);
            // 上传
            uploadImg(formData)
                .then((res) => {
                    _.toast("上传成功", "success");
                    temp.status = "done";
                    temp.url = 'https://images.weserv.nl/?url='+res
                    _.fileList.splice(_.fileList.length - 1, 1, temp);
                    _.handleChange({ file: temp });
                })
                .catch(() => {
                    _.toast("上传失败", "error");
                    temp.status = "error";
                    _.fileList.splice(_.fileList.length - 1, 1);
                    _.handleChange({ file: temp });
                })
        },
    },
};
</script>
<style lang="scss" scoped>
.img_size {
    color: red;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    margin-bottom: 5px;
}
.img_rules{
    margin-top: -15px;
    .suport_text{
        color: #969696;
        font-size: 12px;
        height: 12px;
        line-height: 12px;
        margin: 5px 0
    }
}
::v-deep .ant-upload-list-picture-card .ant-upload-list-item-uploading-text {
    margin-top: 36px;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
}
</style>
