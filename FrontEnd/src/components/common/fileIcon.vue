<template>
    <svg>
        <use :xlink:href="'#'+extension"></use>
    </svg>
</template>
<script>
const supportFileExtensions = ['iso', 'wav', 'zip', 'vob', 'vsd', 'xls', 'txt', 'png', 'psd', 'ppt', 'pdf', 'mp3', 'html', 'jpg', 'file', 'exe', 'gif', 'eml', 'css', 'dll', 'doc']

export default {
    props: {
        fileName: {
            required: true,
            default: null,
            type: String
        }
    },

    computed: {
        extension: function() {
            if (this.fileName) {
                var index1 = this.fileName.lastIndexOf(".");
                var index2 = this.fileName.length;
                var extension = this.fileName.substring(index1 + 1, index2).toLowerCase();//后缀名

                if (supportFileExtensions.includes(extension))
                    return extension;

                if (extension === 'docx')
                    return 'doc';
                else if (extension === 'xlsx')
                    return 'xls';
                else if (extension === 'pptx')
                    return 'ppt';
            }

            return 'file';
        }
    }
}
</script>

<style scoped>
svg {
    width: 48px;
    height: 48px;
}
</style>

