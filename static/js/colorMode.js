(() => {
    'use strict'
  
    const getStoredTheme = () => localStorage.getItem('theme')
    const setStoredTheme = theme => localStorage.setItem('theme', theme)
  
    const getPreferredTheme = () => {
      const storedTheme = getStoredTheme()
      if (storedTheme) {
        return storedTheme
      }
  
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
  
    const setTheme = theme => {
        const offcanvas = document.getElementById('offcanvasDark');
        const button = document.getElementById('offcanvasButton');
    
        if (theme === 'auto') {
            const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-bs-theme', currentTheme);
            offcanvas.classList.toggle('text-bg-dark', currentTheme === 'dark');
            offcanvas.classList.toggle('text-bg-light', currentTheme === 'light');
            button.classList.toggle('btn-dark', currentTheme === 'dark');
            button.classList.toggle('btn-light', currentTheme === 'light');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
            offcanvas.classList.toggle('text-bg-dark', theme === 'dark');
            offcanvas.classList.toggle('text-bg-light', theme === 'light');
            button.classList.toggle('btn-dark', theme === 'dark');
            button.classList.toggle('btn-light', theme === 'light');
        }
    }
  
    setTheme(getPreferredTheme())
  
    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme');
    
        if (!themeSwitcher) {
            return;
        }
    
        const themeSwitcherText = document.querySelector('#bd-theme-text');
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);

        
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active');
            element.setAttribute('aria-pressed', 'false');
        });
    
        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
    
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
    
        if (focus) {
            themeSwitcher.focus();
        }
    };
    
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = getStoredTheme()
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme())
      }
    })
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(getPreferredTheme())
  
      document.querySelectorAll('[data-bs-theme-value]')
        .forEach(toggle => {
          toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            setStoredTheme(theme)
            setTheme(theme)
            showActiveTheme(theme, true)
          })
        })
    })
})()
  