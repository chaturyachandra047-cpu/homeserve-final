function draw(){if(S.role!='customer'&&!S.user){S.role='customer';S.view='shop'}document.body.classList.toggle('auth-screen',AUTH_VIEWS.includes(S.view));nav();document.getElementById('app').innerHTML=AUTH_VIEWS.includes(S.view)?auth():S.role=='customer'?{shop,cart,bookings}[S.view]():S.role=='provider'?provider():admin()}
draw();
