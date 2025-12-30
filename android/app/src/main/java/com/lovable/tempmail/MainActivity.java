package com.lovable.tempmail;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebView;
import android.view.ViewGroup;
import android.view.Gravity;
import android.widget.FrameLayout;
import android.view.View;
import android.view.Menu;
import android.graphics.Color;
import android.content.res.ColorStateList;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Bridge;

public class MainActivity extends BridgeActivity {
    private boolean webViewConfigured = false;
    private BottomNavigationView bottomNav;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onStart() {
        super.onStart();
        configureWebViewDelayed();
    }

    @Override
    public void onResume() {
        super.onResume();
        configureWebViewDelayed();
    }

    private void configureWebViewDelayed() {
        if (webViewConfigured) {
            return;
        }
        
        // Use handler to ensure WebView is fully initialized
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                Bridge bridge = getBridge();
                if (bridge != null) {
                    WebView webView = bridge.getWebView();
                    if (webView != null && !webViewConfigured) {
                        configureWebView(webView);
                        setupBottomNavigation(webView);
                        webViewConfigured = true;
                    }
                } else if (!webViewConfigured) {
                    // Retry if bridge is not ready yet
                    configureWebViewDelayed();
                }
            }
        }, 100);
    }

    private void configureWebView(WebView webView) {
        // Enable hardware acceleration for better rendering
        webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
        
        // Get WebView settings
        android.webkit.WebSettings settings = webView.getSettings();
        
        // Enable JavaScript (should already be enabled by Capacitor)
        settings.setJavaScriptEnabled(true);
        
        // Enable DOM storage
        settings.setDomStorageEnabled(true);
        
        // Enable database storage
        settings.setDatabaseEnabled(true);
        
        // Enable mixed content (if needed)
        settings.setMixedContentMode(android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        
        // Enable text rendering optimizations
        settings.setRenderPriority(android.webkit.WebSettings.RenderPriority.HIGH);
        
        // Enable smooth scrolling
        settings.setLoadsImagesAutomatically(true);
        settings.setBlockNetworkImage(false);
        settings.setBlockNetworkLoads(false);
        
        // Enable CSS features for better text rendering
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        
        // Enable CSS text rendering features
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(false);
        }
        
        // Force hardware acceleration
        webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
    }
    
    private void setupBottomNavigation(WebView webView) {
        if (bottomNav != null) return;
        
        bottomNav = new BottomNavigationView(this);
        bottomNav.setLayoutParams(new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT,
                Gravity.BOTTOM));
        bottomNav.setElevation(16f);
        bottomNav.setFitsSystemWindows(true);
        bottomNav.setBackgroundColor(Color.parseColor("#FFFFFF"));
        bottomNav.setLabelVisibilityMode(BottomNavigationView.LABEL_VISIBILITY_LABELED);
        
        // Tint for selected/unselected items
        ColorStateList tint = new ColorStateList(
                new int[][]{
                        new int[]{android.R.attr.state_checked},
                        new int[]{}
                },
                new int[]{
                        Color.parseColor("#0d9488"), // selected (teal, matches primary)
                        Color.parseColor("#9CA3AF")  // unselected gray
                }
        );
        bottomNav.setItemIconTintList(tint);
        bottomNav.setItemTextColor(tint);
        
        bottomNav.getMenu().add(Menu.NONE, 1, 1, "Mail").setIcon(android.R.drawable.ic_dialog_email);
        bottomNav.getMenu().add(Menu.NONE, 2, 2, "Settings").setIcon(android.R.drawable.ic_menu_preferences);
        bottomNav.setSelectedItemId(1);
        
        bottomNav.setOnItemSelectedListener(item -> {
            if (item.getItemId() == 1) {
                webView.evaluateJavascript("window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate'));", null);
                return true;
            } else if (item.getItemId() == 2) {
                webView.evaluateJavascript("window.history.pushState({}, '', '/settings'); window.dispatchEvent(new PopStateEvent('popstate'));", null);
                return true;
            }
            return false;
        });
        
        // Respect system gesture/nav bar inset so the bar isn't clipped
        ViewCompat.setOnApplyWindowInsetsListener(bottomNav, (v, insets) -> {
            int bottomInset = insets.getInsets(WindowInsetsCompat.Type.systemBars()).bottom;
            v.setPadding(v.getPaddingLeft(), v.getPaddingTop(), v.getPaddingRight(), bottomInset);
            return insets;
        });
        
        FrameLayout decor = (FrameLayout) getWindow().getDecorView();
        decor.addView(bottomNav);
        bottomNav.bringToFront();
    }
}
