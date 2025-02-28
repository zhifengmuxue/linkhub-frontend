<template>
<div class="tool-box">
    <a-row :gutter="24">
    <a-col :span="24">
        <a-card class="tool-card">
        <template #title>
            <span class="tool-title">时间戳工具</span>
        </template>
        <a-input v-model:value="timestamp" placeholder="请输入时间戳" />
        <a-button
            type="primary"
            @click="convertToDate"
            :loading="isLoading"
            style="margin-top: 16px;"
            block
        >
            转换为日期
        </a-button>
        <a-input v-model:value="date" placeholder="请输入日期 (YYYY-MM-DD HH:mm:ss)" style="margin-top: 16px;" />
        <a-button
            type="primary"
            @click="convertToTimestamp"
            :loading="isLoading"
            style="margin-top: 16px;"
            block
        >
            转换为时间戳
        </a-button>
        <div v-if="result" class="tool-result">
            <a-descriptions bordered :column="1">
            <a-descriptions-item label="转换结果">{{ result }}</a-descriptions-item>
            </a-descriptions>
        </div>
        </a-card>
    </a-col>
    </a-row>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

const timestamp = ref('');
const date = ref('');
const result = ref<string | null>(null);
const isLoading = ref(false);

const convertToDate = () => {
if (!timestamp.value.trim()) {
    message.warning('请输入要转换的时间戳');
    return;
}

isLoading.value = true;
try {
    const date = new Date(parseInt(timestamp.value.trim(), 10) * 1000);
    if (isNaN(date.getTime())) {
    throw new Error('无效的时间戳');
    }
    // 转换为北京时间
    const beijingTime = new Date(date.getTime() + 8 * 60 * 60 * 1000);
    result.value = beijingTime.toISOString().replace('T', ' ').substring(0, 19);
} catch (error: unknown) {
    if (error instanceof Error) {
    message.error('转换失败: ' + error.message);
    } else {
    message.error('转换失败: 未知错误');
    }
} finally {
    isLoading.value = false;
}
};

const convertToTimestamp = () => {
if (!date.value.trim()) {
    message.warning('请输入要转换的日期');
    return;
}

isLoading.value = true;
try {
    const dateObj = new Date(date.value.trim());
    if (isNaN(dateObj.getTime())) {
    throw new Error('无效的日期格式');
    }
    // 转换为 UTC 时间戳
    const timestamp = Math.floor(dateObj.getTime() / 1000) - 8 * 60 * 60;
    result.value = timestamp.toString();
} catch (error: unknown) {
    if (error instanceof Error) {
    message.error('转换失败: ' + error.message);
    } else {
    message.error('转换失败: 未知错误');
    }
} finally {
    isLoading.value = false;
}
};
</script>

<style scoped>
.tool-box {
padding: 24px;
}

.tool-card {
height: 100%;
}

.tool-result {
margin-top: 16px;
}
</style>