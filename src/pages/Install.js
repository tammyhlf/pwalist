import { useEffect, useRef, useState } from 'react'

export default function Install() {
  const promptRef = useRef(null)
  const installRef = useRef(null)
  const [installing, setInstalling] = useState(false)
  const [progress, setProgress] = useState(0)

  const onInstall = () => {
    const prompt = promptRef.current
    if (prompt) {
      setInstalling(true)
      prompt.prompt()
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt')
          simulateInstallProgress()
        } else {
          console.log('User dismissed the A2HS prompt')
          setInstalling(false)
        }
        promptRef.current = null
        const installButton = document.getElementById('install-button')
        if (installButton) {
          installButton.style.display = 'none'
        }
      })
    }
  }

  const simulateInstallProgress = () => {
    let progressValue = 0
    const interval = setInterval(() => {
      progressValue += 10
      setProgress(progressValue)
      if (progressValue >= 100) {
        clearInterval(interval)
        setInstalling(false)
        console.log('PWA installed successfully')
        window.location.reload() // 打开已安装的PWA应用
      }
    }, 500)
  }

  useEffect(() => {
    const onBeforeInstallPrompt = (e) => {
      e.preventDefault()
      promptRef.current = e
      console.log('beforeinstallprompt event was fired')
      const installButton = document.getElementById('install-button')
      if (installButton) {
        installButton.style.display = 'block'
      }
    }

    const onAppInstalled = () => {
      console.log('PWA was installed')
      setInstalling(false)
      setProgress(100)
      window.location.reload() // 打开已安装的PWA应用
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [])

  return (
    <div>
      <div id="install-button" ref={installRef} onClick={onInstall}>
        安装
      </div>
      {installing && <div>安装中: {progress}%</div>}
    </div>
  )
}
