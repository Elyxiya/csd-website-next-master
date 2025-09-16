const verificationPost = defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase, apiToken, secretKey } = runtimeConfig

  const body = await readBody<{
    email: any
  }>(event)

  
  try {
   
    const response = await $fetch<unknown>(`${apiBase}/api/verification`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: {
         email: body.email
      },
    })
     

    return response
     } catch (error: any) {
  
    // 完全隐藏原始错误信息，返回统一的错误响应
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: '请求处理失败，请稍后重试',
      stack:"",
      data: error.data,
    })
  }

})

export default verificationPost
