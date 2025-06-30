
import { useState, useEffect } from 'react';

const JsonEditor = () => {
  const [jsonData, setJsonData] = useState({
    title: '',
    sections: [],
    notes: []
  });
  const [activeSection, setActiveSection] = useState(null);
  const [activeStep, setActiveStep] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [lastSaved, setLastSaved] = useState(null);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('jsonEditorData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setJsonData(data);
        setLastSaved(new Date());
        return; // 如果有 localStorage 数据，直接返回，不加载模板
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }

    // 如果没有 localStorage 数据，则加载模板
    fetch('/1.json')
      .then(response => response.text())
      .then(text => {
        // 处理模板字符串
        const processedText = text.replace(/`([^`]+)`/g, (match, content) => {
          return JSON.stringify(content);
        });
        try {
          const data = JSON.parse(processedText);
          setJsonData(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Error loading JSON file. Please check the file format.');
        }
      })
      .catch(error => {
        console.error('Error loading JSON:', error);
        alert('Error loading JSON file. Please check if the file exists.');
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 自动保存到 localStorage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem('jsonEditorData', JSON.stringify(jsonData));
        setLastSaved(new Date());
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }, 2000); // 2秒后自动保存

    return () => clearTimeout(saveTimeout);
  }, [jsonData]);

  const handleSave = () => {
    try {
      localStorage.setItem('jsonEditorData', JSON.stringify(jsonData));
      setLastSaved(new Date());
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  const handleExport = () => {
    try {
      // 将数据转换回带有模板字符串的格式
      const dataToExport = JSON.stringify(jsonData, null, 0)
        // .replace(/"([^"]+)"/g, (match, content) => {
        //   // 检查是否是代码块
        //   if (content.includes('\n') || content.includes('import') || content.includes('function')) {
        //     return `\`${content}\``;
        //   }
        //   return match;
        // });
      const callbackName = "callbackFunction";

      // 拼接成 JSONP 格式：callback({...})
      const jsonpStr = callbackName + '(' + dataToExport + ');'; 
      // 创建 Blob 对象
      const blob = new Blob([jsonpStr], { type: 'application/js' });
      const url = URL.createObjectURL(blob);
      
      // 创建下载链接
      const a = document.createElement('a');
      a.href = url;
      a.download = `${new Date().toISOString().split('T')[0]}-${jsonData.title}.js`;
      
      // 触发下载
      document.body.appendChild(a);
      a.click();
      
      // 清理
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error exporting file. Please try again.');
    }
  };

  const addSection = () => {
    setJsonData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', steps: [] }]
    }));
  };

  const addStep = (sectionIndex) => {
    setJsonData(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].steps.push({
        title: '',
        content: '',
        code: '',
        note: ''
      });
      return { ...prev, sections: newSections };
    });
  };

  const updateSection = (index, field, value) => {
    setJsonData(prev => {
      const newSections = [...prev.sections];
      newSections[index] = { ...newSections[index], [field]: value };
      return { ...prev, sections: newSections };
    });
  };

  const updateStep = (sectionIndex, stepIndex, field, value) => {
    setJsonData(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].steps[stepIndex] = {
        ...newSections[sectionIndex].steps[stepIndex],
        [field]: value
      };
      return { ...prev, sections: newSections };
    });
  };

  const deleteSection = (sectionIndex) => {
    setJsonData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex)
    }));
  };

  const deleteStep = (sectionIndex, stepIndex) => {
    setJsonData(prev => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].steps = newSections[sectionIndex].steps.filter((_, index) => index !== stepIndex);
      return { ...prev, sections: newSections };
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToElement = (sectionIndex, stepIndex = null) => {
    setActiveSection(sectionIndex);
    setActiveStep(stepIndex);
    
    const element = stepIndex !== null
      ? document.querySelector(`[data-section="${sectionIndex}"][data-step="${stepIndex}"]`)
      : document.querySelector(`[data-section="${sectionIndex}"]`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // 在移动端点击菜单项后关闭菜单
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      ...styles.globalScrollbar
    }}>
      <button 
        style={{
          ...styles.menuToggle,
          display: windowWidth <= 768 ? 'block' : 'none'
        }}
        onClick={toggleMenu}
      >
        {isMenuOpen ? '×' : '☰'} Menu
      </button>

      <div 
        style={{
          ...styles.overlay,
          display: isMenuOpen && windowWidth <= 768 ? 'block' : 'none'
        }}
        onClick={closeMenu}
      />

      <div 
        style={{
          ...styles.menuBar,
          transform: windowWidth <= 768 && !isMenuOpen ? 'translateX(-100%)' : 'translateX(0)'
        }}
      >
        <div style={styles.menuTitle}>目录结构</div>

        {jsonData.title && (
          <div style={styles.menuSection}>
            <div style={styles.menuSectionTitle}>主标题</div>
            <div style={{
              ...styles.menuItem,
              ...(activeSection === null && activeStep === null ? styles.menuItemActive : {})
            }}>
              <span style={styles.menuIcon}>
                {/* 📝 */}
                -
                </span>
              {jsonData.title}
            </div>
          </div>
        )}

        {jsonData.sections.length > 0 && (
          <div style={styles.menuSection}>
            <div style={styles.menuSectionTitle}>小节</div>
            {jsonData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div
                  style={{
                    ...styles.menuItem,
                    ...(activeSection === sectionIndex && activeStep === null ? styles.menuItemActive : {})
                  }}
                  onClick={() => scrollToElement(sectionIndex)}
                >
                  <span style={styles.menuIcon}>-</span>
                  {section.title || `Section ${sectionIndex + 1}`}
                </div>
                {section.steps.map((step, stepIndex) => (
                  <div
                    key={stepIndex}
                    style={{
                      ...styles.menuItem,
                      ...styles.menuStep,
                      ...(activeSection === sectionIndex && activeStep === stepIndex ? styles.menuItemActive : {})
                    }}
                    onClick={() => scrollToElement(sectionIndex, stepIndex)}
                  >
                    <span style={styles.menuIcon}>
                      {/* 📌 */}
                    ○
                    </span>
                    {step.title || `Step ${stepIndex + 1}`}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {jsonData.notes.length > 0 && (
          <div style={styles.menuSection}>
            <div style={styles.menuSectionTitle}>标注</div>
            <div style={styles.menuItem}>
              <span style={styles.menuIcon}>
                {/* 📋 */}
                -
                </span>
              {jsonData.notes.length} 个标注
            </div>
          </div>
        )}
      </div>

      <div style={{
        ...styles.mainContent,
        marginLeft: windowWidth <= 768 ? 0 : '320px'
      }}> 
        <h1 style={styles.title}>文章编辑器</h1>
        
        <div style={styles.editorSection}>
          <h2 style={styles.sectionTitle}>主标题</h2>
          <input
            type="text"
            value={jsonData.title}
            onChange={(e) => setJsonData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter title"
            style={styles.input}
          />
        </div>

        <div style={styles.editorSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>小节</h2>
            <button onClick={addSection} style={styles.addButton}>+ 添加小节</button>
          </div>
          
          {jsonData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} style={styles.section} data-section={sectionIndex}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionTitleContainer}>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                    placeholder="Section title"
                    style={styles.input}
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button onClick={() => addStep(sectionIndex)} style={styles.button}>+ 添加步骤</button>
                  <button onClick={() => deleteSection(sectionIndex)} style={styles.deleteButton}>× 删除</button>
                </div>
              </div>
              
              <div className="steps">
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} style={styles.step} data-section={sectionIndex} data-step={stepIndex}>
                    <div style={styles.sectionHeader}>
                      <div style={styles.sectionTitleContainer}>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateStep(sectionIndex, stepIndex, 'title', e.target.value)}
                          placeholder="Step title"
                          style={styles.input}
                        />
                      </div>
                      <button onClick={() => deleteStep(sectionIndex, stepIndex)} style={styles.deleteButton}>× 删除</button>
                    </div>
                    <textarea
                      value={step.content}
                      onChange={(e) => updateStep(sectionIndex, stepIndex, 'content', e.target.value)}
                      placeholder="Step content"
                      style={styles.textarea}
                    />
                    <textarea
                      value={step.code}
                      onChange={(e) => updateStep(sectionIndex, stepIndex, 'code', e.target.value)}
                      placeholder="Code"
                      style={styles.textarea}
                    />
                    <textarea
                      value={step.note}
                      onChange={(e) => updateStep(sectionIndex, stepIndex, 'note', e.target.value)}
                      placeholder="Note"
                      style={styles.textarea}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.editorSection}>
          <h2 style={styles.sectionTitle}>标注</h2>
          <textarea
            value={jsonData.notes.join('\n')}
            onChange={(e) => setJsonData(prev => ({ ...prev, notes: e.target.value.split('\n') }))}
            placeholder="Enter notes (one per line)"
            style={styles.textarea}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px'
        }}>
          <button style={styles.saveButton} onClick={handleSave}>
            保存
          </button>
          <button 
            style={{
              ...styles.saveButton,
              background: 'linear-gradient(135deg, #3498db, #2980b9)',
              boxShadow: '0 4px 6px rgba(52, 152, 219, 0.2)'
            }} 
            onClick={handleExport}
          >
            导出JSONP
          </button>
        </div>

        {lastSaved && (
          <div style={{
            textAlign: 'center',
            color: '#718096',
            fontSize: '0.9em',
            marginTop: '10px'
          }}>
            Last saved: {lastSaved.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  jsonEditor: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px 20px',
    background: '#f8f9fa',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      padding: '15px 10px'
    }
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#2c3e50',
    fontSize: '2.5em',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '15px',
    '@media (max-width: 768px)': {
      fontSize: '2em',
      marginBottom: '30px'
    }
  },
  titleAfter: {
    content: '',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(90deg, #3498db, #2ecc71)',
    borderRadius: '2px'
  },
  editorSection: {
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '15px',
      marginBottom: '20px'
    }
  },
  sectionTitle: {
    marginTop: 0,
    color: '#2c3e50',
    borderBottom: '2px solid #edf2f7',
    paddingBottom: '15px',
    fontSize: '1.5em',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '2px solid #edf2f7',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '10px',
      fontSize: '14px'
    }
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '12px',
    marginBottom: '15px',
    border: '2px solid #edf2f7',
    borderRadius: '8px',
    fontFamily: "'Fira Code', monospace",
    fontSize: '14px',
    lineHeight: '1.6',
    resize: 'vertical',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '10px',
      fontSize: '13px',
      minHeight: '100px'
    }
  },
  section: {
    background: '#f8fafc',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '25px',
    border: '1px solid #edf2f7',
    transition: 'all 0.3s ease',
    '@media (max-width: 768px)': {
      padding: '20px'
    }
  },
  step: {
    background: '#fff',
    border: '1px solid #edf2f7',
    borderRadius: '8px',
    padding: '25px',
    marginBottom: '20px',
    transition: 'all 0.2s ease',
    '@media (max-width: 768px)': {
      padding: '20px'
    }
  },
  button: {
    background: 'linear-gradient(135deg, #3498db, #2980b9)',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '100px',
    justifyContent: 'center'
  },
  saveButton: {
    display: 'block',
    width: '180px',
    margin: '40px auto',
    background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
    fontSize: '15px',
    padding: '12px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(46, 204, 113, 0.2)',
    minWidth: '180px',
    justifyContent: 'center'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '12px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '10px'
    }
  },
  sectionTitleContainer: {
    flex: 1,
    marginRight: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      justifyContent: 'flex-end'
    }
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '100px',
    justifyContent: 'center'
  },
  addButton: {
    background: 'linear-gradient(135deg, #3498db, #2980b9)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    minWidth: '120px',
    justifyContent: 'center'
  },
  menuToggle: {
    display: 'none',
    position: 'fixed',
    top: '10px',
    left: '10px',
    zIndex: 1001,
    background: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  menuBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '280px',
    background: '#fff',
    borderRight: '1px solid #edf2f7',
    padding: '20px',
    overflowY: 'auto',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.05)',
    zIndex: 1000,
    transition: 'transform 0.3s ease',
    '@media (max-width: 768px)': {
      transform: 'translateX(-100%)'
    }
  },
  mainContent: {
    marginLeft: '320px',
    padding: '30px 40px',
    maxWidth: '1200px',
    margin: '0 auto 0 320px',
    background: '#f8f9fa',
    minHeight: '100vh',
    transition: 'margin-left 0.3s ease',
    '@media (max-width: 768px)': {
      marginLeft: 0,
      padding: '15px 10px'
    }
  },
  menuTitle: {
    fontSize: '1.2em',
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #edf2f7'
  },
  menuItem: {
    padding: '8px 12px',
    marginBottom: '4px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    color: '#4a5568',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  menuItemHover: {
    background: '#f7fafc',
    color: '#2c3e50'
  },
  menuItemActive: {
    background: '#ebf8ff',
    color: '#2b6cb0'
  },
  menuSection: {
    marginBottom: '20px'
  },
  menuSectionTitle: {
    fontSize: '0.9em',
    fontWeight: '500',
    color: '#718096',
    marginBottom: '8px',
    paddingLeft: '12px'
  },
  menuStep: {
    paddingLeft: '24px',
    fontSize: '0.9em'
  },
  menuIcon: {
    width: '16px',
    height: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  },
  globalScrollbar: {
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px'
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '5px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#cbd5e0',
      borderRadius: '5px',
      border: '2px solid #f1f1f1',
      '&:hover': {
        background: '#a0aec0'
      }
    }
  }
};
export default JsonEditor; 