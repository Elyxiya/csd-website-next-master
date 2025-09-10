interface ReCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit?: boolean;
  'error-codes'?: string[];
  score?: number;
  score_reason?: string[];
}

const enrollsPost = defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase, apiToken, secretKey } = runtimeConfig

  const body = await readBody<{
    data: any

  }>(event)

  
  try {
   
    const response = await $fetch<unknown>(`${apiBase}/api/enrolls`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: {
        data: body.data
      },
    })
     

    return response
     } catch (error: any) {
    console.error('内部API错误详情:', error) // 服务端日志记录真实错误
    
    // 完全隐藏原始错误信息，返回统一的错误响应
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: '请求处理失败，请稍后重试',
      data: {
        code: error.statusCode,
        message: '提交失败，请联系管理员！',
      }
    })
  }

})

export default enrollsPost
