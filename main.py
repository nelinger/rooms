import logging

from flask import Flask, render_template, request


app = Flask(__name__)


@app.route('/player')
def player_handler():
    return render_template('player.html', title="RoomsTube player demo")

@app.route('/')
def home_handler():
    return render_template('home.html', title="RoomsTube")    

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500