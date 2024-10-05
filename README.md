思路：
1. 捕获屏幕截图（mac监听截图保存的路径的目录，windows监听剪切板）
2. 识别图片内容ocr：tesseract.js
3. 将识别结果调用prompt：openai
4. 获取问题结果展示

   实现步骤
	1.	配置环境变量：
	•	使用 dotenv 加载 .env 文件中的配置，以便动态设置 SCREENSHOT_DIR 和 OCR_LANGUAGES。
	2.	初始化 Express 应用：
	•	创建一个 Express 应用，并设置 CORS（跨源资源共享）中间件，以允许跨域请求。
	3.	设置 Server-Sent Events (SSE)：
	•	创建一个 /api/realtime-questions 的 GET �
	4.	OCR 工作初始化：
	•	使用 tesseract.js 创建 OCR 工作器，通过 createWorker 方法初始化 OCR 处理器。
	5.	执行 OCR 识别：
	•	定义 performOCR �
	6.	处理新截图：
	•	定义 handleNewScreenshot 函数，该函数通过 debounce 方法对新截图进行处理，避免频繁调用。主要步骤如下：
	•	执行 OCR 识别。
	•	调用 OpenAI API（通过 analyzeQuestion �
	•	格式化结果并将其添加到问题队列中。
	•	删除处理完成的截图文件。
	7.	监视截图目录：
	•	使用 chokidar 监视 screenshotDir 目录，监听新文件添加事件。对新添加的 PNG 文件进行处理。
	8.	定义 API 路由：
	•	/api/latest-question 路由用于获取队列中的最新问题。
	•	/api/all-questions 路由用于获取所有问题。
	9.	主函数执行：
	•	在 main 函数中，初始化工作器、启动文件监视器和 Express 服务器。
	10.	错误处理：
	•	捕获未处理的异常和拒绝，记录错误信息并退出进程。

	11.	Windows 剪贴板监控：
	•	使用 clipboardy 访问 Windows 剪贴板。
	•	定义 handleClipboardTextChange 函数，处理剪贴板文本变化。
	•	将剪贴板监控集成到现有的 OCR 处理流程中。
