import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.less'; 

const CodeBlock = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒后重置
  };

  return (
    <div className="code-block">
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button className="copy-button">复制</button>
      </CopyToClipboard>
      {copied && <span className="copy-feedback">已复制!</span>}
      <pre>
        <code>{value}</code>
      </pre>
    </div>
  );
};

const MarkdownViewer = () => {
  const [markdown, setMarkdown] = useState('');
  const [toc, setToc] = useState([]); // 用于存储目录
  useEffect(() => {
    fetch('/docs/2022-06-25-hexo入门文章.md') // 替换为你的实际路径
    .then(response => response.text())
    .then(text => {
      setMarkdown(text);
      generateToc(text); // 在加载时生成目录
    })
    .catch(err => console.error(err));
  }, []);

  const generateToc = (text) => {
    const headings = text.match(/^(#{1,6})\s+(.*)$/gm); // 匹配标题
    if (headings) {
      const tocItems = headings.map((heading) => {
        const level = heading.match(/#/g).length; // 获取标题层级
        const title = heading.replace(/^#+\s*/, ''); // 去掉标题符号
        const id = title.toLowerCase().replace(/\s+/g, '-'); // 生成 ID
        return { level, title, id }; // 返回标题信息
      });
      setToc(tocItems); // 设置目录
    }
  };

  return (
    <div className="markdown-container">
      <ReactMarkdown
        // remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const codeString = String(children).replace(/\n$/, '');
            return inline ? (
              <code className={className} {...props}>
                {codeString}
              </code>
            ) : (
              <CodeBlock value={codeString} />
            );
          },
          img({ src, alt, ...props }) {
            return <img src={`./docs/${src}`} alt={alt} {...props} style={{ maxWidth: '100%', height: 'auto' }} />
          },
          h2({ node, children }) {
            return <h2 id={children.toString().toLowerCase().replace(/\s+/g, '-')}>{children}</h2>;
          },
          // h3({ node, children }) {
          //   return <h3 id={children.toString().toLowerCase().replace(/\s+/g, '-')}>{children}</h3>;
          // },
          // Add c
          // This assumes you are rendering TOC in a certain way, adjust as necessary
          p({ node, children }) {
            if(children == "[TOC]") {
              return  <div className="toc">
              <ul>
                {toc.map((item) => (
                  <li key={item.id} style={{ marginLeft: (item.level - 1) * 20 }}>
                    <a >{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            } else {
              return <p>{children}</p>;
            }
            
          },
          // 处理链接，确保不受 hash 路由影响
          a({ node, ...props }) {
            return (
              <a
                {...props}
                onClick={(e) => {
                  e.preventDefault(); // 阻止默认行为
                  const targetId = props.href.replace('#', ''); // 获取目标 ID
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到目标元素
                  }
                }}
              >
                {props.children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;