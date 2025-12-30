import UIKit
import Capacitor

class BridgeViewController: CAPBridgeViewController, UITabBarDelegate {
    private var nativeTabBar: UITabBar?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if #available(iOS 11.0, *) {
            self.view.insetsLayoutMarginsFromSafeArea = false
        }
        self.edgesForExtendedLayout = .all
        
        setupNativeTabBar()
    }
    
    private func setupNativeTabBar() {
        let tabBar = UITabBar()
        tabBar.translatesAutoresizingMaskIntoConstraints = false
        tabBar.delegate = self
        
        let mailItem = UITabBarItem(title: "Mail", image: UIImage(systemName: "envelope"), tag: 0)
        let settingsItem = UITabBarItem(title: "Settings", image: UIImage(systemName: "gearshape"), tag: 1)
        tabBar.items = [mailItem, settingsItem]
        tabBar.selectedItem = mailItem
        
        self.view.addSubview(tabBar)
        self.nativeTabBar = tabBar
        
        NSLayoutConstraint.activate([
            tabBar.leadingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.leadingAnchor),
            tabBar.trailingAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.trailingAnchor),
            tabBar.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor)
        ])
        
        self.view.bringSubviewToFront(tabBar)
    }
    
    func tabBar(_ tabBar: UITabBar, didSelect item: UITabBarItem) {
        let path = item.tag == 0 ? "/" : "/settings"
        navigateTo(path: path)
    }
    
    private func navigateTo(path: String) {
        let script = "window.history.pushState({}, '', '\(path)'); window.dispatchEvent(new PopStateEvent('popstate'));"
        self.bridge?.webView?.evaluateJavaScript(script, completionHandler: nil)
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        if #available(iOS 11.0, *) {
            self.additionalSafeAreaInsets = UIEdgeInsets.zero
        }
    }
    
    override func viewSafeAreaInsetsDidChange() {
        super.viewSafeAreaInsetsDidChange()
        if #available(iOS 11.0, *) {
            self.additionalSafeAreaInsets = UIEdgeInsets.zero
        }
    }
}
