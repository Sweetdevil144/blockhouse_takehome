from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("line-chart-data", views.line_chart, name="line_chart"),
    path("bar-chart-data", views.bar_chart, name="bar_chart"),
    path("pie-chart-data", views.pie_chart, name="pie_chart"),
    path("candlestick-data", views.candlestick, name="candlestick"),
]