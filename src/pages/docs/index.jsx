import React, { useEffect, useState } from 'react';
import { staticApi } from "../../util/request.js"

const OpenCVTutorial = (dataParent) => {
  
  // const data = {
  //   "title": "OpenCV基础教程",
  //   "sections": [
  //     {
  //       "title": "环境准备aaa",
  //       "steps": [
  //         {
  //           "title": "安装Python环境aaaa",
  //           "content": "在使用OpenCV之前，首先需要确保您的电脑上安装了Python环境。建议使用Python 3.7或更高版本。111",
  //           "code": "python --version111aaaa",
  //           "note": "如果未安装Python，请访问Python官网下载并安装"
  //         },
  //         {
  //           "title": "安装OpenCV库",
  //           "content": "使用pip包管理器安装OpenCV库，这是进行图像处理的基础库：",
  //           "code": "pip install opencv-pythonbbbb\npip install opencv-python-headless  # 如果不需要GUI功能\n\nccccc",
  //           "note": `安装完成后，可以通过以下命令验证安装：\nimport cv2\nprint(cv2.__version__)\ncccc`
  //         }
  //       ]
  //     },
  //     {
  //       "title": "基础图像处理",
  //       "steps": [
  //         {
  //           "title": "图像读取和显示",
  //           "content": "下面是一个简单的图像处理示例：",
  //           "code": `import cv2\r\nimport numpy as np\r\n\r\n# 读取图像\r\nimg = cv2.imread('image.jpg')\r\n\r\n# 转换为灰度图\r\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\r\n\r\n# 显示结果\r\ncv2.imshow('Original', img)\r\ncv2.imshow('Gray', gray)\r\ncv2.waitKey(0)\r\ncv2.destroyAllWindows()`,
  //           "note": "确保图像文件路径正确，且图像格式支持（jpg、png等）"
  //         },
  //         {
  //           "title": "你好",
  //           "content": "你好",
  //           "code": "你好",
  //           "note": "你好"
  //         }
  //       ]
  //     }
  //   ],
  //   "notes": [
  //     "确保Python环境正确配置",
  //     "图像处理前检查图像是否成功加载",
  //     "注意内存使用，处理大图像时可能需要优化"
  //   ]
  // }
  const data = {
    "title": "",
    "sections": [
    ]
  }
          

  const [tutorialData, setTutorialData] = useState(data)
  // const [tutorialData] = useState({
  //   title: "OpenCV基础教程",
  //   sections: [
  //     {
  //       title: "环境准备",
  //       steps: [
  //         {
  //           title: "安装Python环境",
  //           content: "在使用OpenCV之前，首先需要确保您的电脑上安装了Python环境。建议使用Python 3.7或更高版本。",
  //           code: "python --version",
  //           note: "如果未安装Python，请访问Python官网下载并安装",
  //           // image: {
  //           //   src: "https://pic4.zhimg.com/v2-a9c3e5d8d611526eb45d3c0ee4cd1087_r.jpg",
  //           //   alt: "Python安装界面",
  //           //   caption: "图1: Python安装界面截图",
  //           //   placeholder: "Python安装界面加载中..."
  //           // }
  //         },
  //         {
  //           title: "安装OpenCV库",
  //           content: "使用pip包管理器安装OpenCV库，这是进行图像处理的基础库：",
  //           code: "pip install opencv-python\npip install opencv-python-headless  # 如果不需要GUI功能",
  //           note: "安装完成后，可以通过以下命令验证安装：\nimport cv2\nprint(cv2.__version__)",
  //           // image: {
  //           //   src: "https://pic4.zhimg.com/v2-a9c3e5d8d611526eb45d3c0ee4cd108222227_r.jpg",
  //           //   alt: "OpenCV安装成功截图",
  //           //   caption: "图2: OpenCV安装成功验证",
  //           //   placeholder: "OpenCV安装截图加载中..."
  //           // }
  //         },
  //         {
  //           title: "图像读取和显示",
  //           content: "下面是一个简单的图像处理示例：",
  //           code: "import cv2\nimport numpy as np\n\n# 读取图像\nimg = cv2.imread('image.jpg')\n\n# 转换为灰度图\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n\n# 显示结果\ncv2.imshow('Original', img)\ncv2.imshow('Gray', gray)\ncv2.waitKey(0)\ncv2.destroyAllWindows()",
  //           note: "确保图像文件路径正确，且图像格式支持（jpg、png等）",
  //           // image: {
  //           //   src: "https://pic4.zhimg.com/v2-a9c3e5d8d611526eb45d3c0ee4cd1087_r.jpg",
  //           //   alt: "图像处理效果对比",
  //           //   caption: "图3: 原始图像与灰度图对比",
  //           //   placeholder: "图像处理效果加载中..."
  //           // }
  //         }
  //       ]
  //     },
  //     {
  //       title: "基础图像处理",
  //       steps: [
  //         {
  //           title: "图像读取和显示",
  //           content: "下面是一个简单的图像处理示例：",
  //           code: "import cv2\nimport numpy as np\n\n# 读取图像\nimg = cv2.imread('image.jpg')\n\n# 转换为灰度图\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n\n# 显示结果\ncv2.imshow('Original', img)\ncv2.imshow('Gray', gray)\ncv2.waitKey(0)\ncv2.destroyAllWindows()",
  //           note: "确保图像文件路径正确，且图像格式支持（jpg、png等）",
  //           image: {
  //             src: "https://pic4.zhimg.com/v2-a9c3e5d8d611526eb45d3c0ee4cd1087_r.jpg",
  //             alt: "图像处理效果对比",
  //             caption: "图3: 原始图像与灰度图对比",
  //             placeholder: "图像处理效果加载中..."
  //           }
  //         }
  //       ]
  //     }
  //   ],
  //   notes: [
  //     "确保Python环境正确配置",
  //     "图像处理前检查图像是否成功加载",
  //     "注意内存使用，处理大图像时可能需要优化"
  //   ]
  // });

  // 图片懒加载实现
  
  useEffect(() => {
   if (dataParent.param != "") {
    let params = dataParent.param.split("=")[1]


    try {
      document.title = decodeURIComponent(params.split("docjson/")[1].split(".json")[0])
    } catch (error) {
      
    }
     console.log("发送请求");

    staticApi.get(params, { }, function(error, data) {
      if (error) {
          console.error('Error:', error);
          return;
      }
      console.log('Data:', data);
      setTutorialData(data);
      console.log("刷新");

  });
   }

    console.log(dataParent.param)
    const lazyLoadImages = () => {
      const lazyImages = document.querySelectorAll('.tutorial-image[data-loaded="false"]');
    
      for(var i = 0; i < lazyImages.length; i++) {
        if (isInViewport(lazyImages[i])) {
          loadImage(lazyImages[i]);
        }
      }
      // lazyImages.forEach(img => {
      //   if (isInViewport(img)) {
      //     loadImage(img);
      //   }
      // });
    };

    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      
      return (
        rect.top <= (viewportHeight + 100) &&
        rect.bottom >= -100 &&
        rect.left <= (viewportWidth + 100) &&
        rect.right >= -100
      );
    };

    const loadImage = (imgElement) => {
      const src = imgElement.getAttribute('data-src');
      if (!src) return;

      imgElement.setAttribute('data-loaded', 'true');
      
      const tempImg = new Image();
      tempImg.onload = () => {
        imgElement.src = src;
        imgElement.classList.add('loaded');
        
        const placeholder = imgElement.previousElementSibling;
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
          placeholder.parentNode.removeChild(placeholder);
        }
      };
      
      tempImg.onerror = () => {
        console.error('图片加载失败:', src);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'image-error';
        errorMsg.textContent = '图片加载失败';
        const placeholder = imgElement.previousElementSibling;
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
          placeholder.parentNode.replaceChild(errorMsg, placeholder);
        }
      };
      
      tempImg.src = src;
    };

    // 节流函数
    const throttle = (fn, delay) => {
      let timer = null;
      return function() {
        const context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, delay);
      };
    };

    const throttledCheck = throttle(lazyLoadImages, 200);
    
    window.addEventListener('scroll', throttledCheck);
    window.addEventListener('resize', throttledCheck);
    window.addEventListener('load', lazyLoadImages);
    
    // 初始检查
    lazyLoadImages();

    return () => {
      window.removeEventListener('scroll', throttledCheck);
      window.removeEventListener('resize', throttledCheck);
      window.removeEventListener('load', lazyLoadImages);
    };
  }, []);

  // 复制代码功能
  const copyToClipboard = (text) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      return true;
    } catch (err) {
      console.error('复制失败:', err);
      return false;
    }
  };

  return (
    <div className="tutorial-container">
      <h1 className="section-title">{tutorialData.title}</h1>

      {tutorialData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h2 className="section-title">{section.title}</h2>

          {section.steps.map((step, stepIndex) =>{
            console.log(step, stepIndex, sectionIndex)
            // stepIndex = stepIndex + 10 * sectionIndex;
            return  (  
              <div key={stepIndex} className="step">
                <div className="step-header">
                  <span className="step-number">{stepIndex + 1}</span>
                  <h3>{step.title}</h3>
                </div>
  
                <div className="content">
                  <p>{step.content}</p>
  
                  {step.image && (
                    <div className="image-container">
                      {step.image.placeholder && (
                        <div className="image-placeholder">{step.image.placeholder}</div>
                      )}
                      <img
                        className="tutorial-image"
                        data-src={step.image.src}
                        data-loaded="false"
                        alt={step.image.alt}
                      />
                      {step.image.caption && (
                        <div className="image-caption">{step.image.caption}</div>
                      )}
                    </div>
                  )}
  
                  {step.code && (
                    <div className="code-block">
                      <pre>{step.code}</pre>
                      <button
                        className="copy-button"
                        onClick={(e) => {
                          const button = e.currentTarget;
                          const success = copyToClipboard(step.code);
                          if (success) {
                            button.textContent = '已复制!';
                            button.classList.add('copied');
                            setTimeout(() => {
                              button.textContent = '复制代码';
                              button.classList.remove('copied');
                            }, 2000);
                          } else {
                            button.textContent = '复制失败';
                          }
                        }}
                      >
                        复制代码
                      </button>
                    </div>
                  )}
  
                  {step.note && (
                    <div className="note">{step.note}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ))}

      {tutorialData.notes && tutorialData.notes.length > 0 && (
        <div className="section">
          <h2 className="section-title">注意事项</h2>
          <div className="content">
            {tutorialData.notes.map((note, index) => (
              <div key={index} className="list-item">{note}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenCVTutorial;

// 样式部分
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
  }

  .tutorial-container {
    padding: 20px;
  }

  .section {
    margin-bottom: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .section-title {
    font-size: 1.5em;
    color: #2c3e50;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }

  .code-block {
    background-color: #f8f9fa;
    border-radius: 4px;
    padding: 15px;
    margin: 15px 0;
    font-family: 'Consolas', 'Monaco', monospace;
    overflow-x: auto;
    position: relative;
  }

  .code-block pre {
    margin: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px 12px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
  }

  .copy-button:hover {
    background-color: #1976d2;
  }

  .copy-button.copied {
    background-color: #4caf50;
  }

  .content {
    margin: 15px 0;
    line-height: 1.8;
  }

  .content p {
    margin-bottom: 12px;
  }

  .note {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 15px;
    margin: 15px 0;
  }

  .step {
    margin-bottom: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #2196f3;
  }

  .step:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .step-number {
    display: inline-block;
    background: #2196f3;
    color: white;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 14px;
    margin-right: 12px;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(33, 150, 243, 0.3);
  }

  .step h3 {
    display: inline-block;
    margin: 0;
    color: #2c3e50;
    font-size: 1.2em;
  }

  .step-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .result {
    margin-top: 15px;
    padding: 15px;
    background: #f1f8e9;
    border-radius: 4px;
  }

  .result-title {
    font-weight: bold;
    color: #2e7d32;
    margin-bottom: 10px;
  }

  .list-item {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
  }

  .list-item:before {
    content: "•";
    color: #2196f3;
    position: absolute;
    left: 0;
  }

  .image-container {
    margin: 15px 0;
    text-align: center;
    min-height: 150px;
  }

  .tutorial-image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  .tutorial-image.loaded {
    opacity: 1;
  }

  .image-placeholder {
    width: 100%;
    height: 150px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #999;
    font-size: 0.9em;
  }

  .image-caption {
    margin-top: 8px;
    font-size: 0.9em;
    color: #666;
  }

  .image-error {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffebee;
    color: #d32f2f;
    border-radius: 4px;
  }
`;

// 动态添加样式到head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);