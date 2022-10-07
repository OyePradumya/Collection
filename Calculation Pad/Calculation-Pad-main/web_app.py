# Required Imports
import streamlit as st
from streamlit_drawable_canvas import st_canvas
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import utilities
import time

# Helping Variables
INFO_MSGS = {
    0: "Expression Evaluated Successfully!",
    1: "Could not evaluate the expression!"
}

DIGITS_SYMBOLS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
                 "sin", "cos", "log", "tan", "√",
                 "(", ")", "+", "-", "x", "/"]

def main_app():
    st.set_page_config(page_title="Calculation Pad", page_icon=None)

    # Add bootstrap CSS
    st.markdown(
        """
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        """,
        unsafe_allow_html = True
    )

    # Title 
    st.markdown(
        """
            <div class="container d-flex justify-content-center border border-2 border-warning rounded-pill">
                <h1 style="color: #09ab93;">Calculation Pad</h1>
            </div>
        """,
        unsafe_allow_html = True
    )

    # Header
    st.markdown(
        """
            <div class="container d-flex justify-content-center my-4">
                <p class="lead" style="font-size: 20px;">
                    Jot down any mathematical expression as you would on a paper,
                    Let machine learning take care of the rest.
                </p>
            </div>
        """,
        unsafe_allow_html = True
    )
    
    # Canvas
    canvas_result = st_canvas(
        fill_color = "#ffffff",
        stroke_width = 3,
        background_color = "#ffffff",
        display_toolbar = True,
        update_streamlit = True,
        height = 500,
        width = 650,
        key = "canvas"
    )
    st.markdown("<br>", unsafe_allow_html=True)

    exp, res = "Expression", "Result"
    show_results = False
    helper_component = st.empty()
    msg_idx = -1

    if st.button("Evaluate"):
        with st.spinner("Working on it..."):
            ans = utilities.display_predictions(canvas_result.image_data)
            if ans:
                exp, res = ans
                msg_idx = 0
            else:
                msg_idx = 1
                exp, res = "Error", "Undefined"
            show_results = True
        
    # Components layout
    if show_results:
        expression_col, result_col = st.beta_columns(2)
        expression_col.markdown(
            f"""
                <div class="container d-flex justify-content-center border border-2 rounded-3 border-primary my-4">
                    <span class="lead" style="color: aquawhite; font-size: 25px;">{exp}</span>
                </div>
            """,
            unsafe_allow_html = True
        )
        result_col.markdown(
            f"""
                <div class="container d-flex justify-content-center border border-2 rounded-3 border-success my-4">
                    <span class="lead" style="color: aquawhite; font-size: 25px;">{res}</span>
                </div>
            """,
            unsafe_allow_html = True
        )
        
        if msg_idx == 0:
            helper_component.success(INFO_MSGS[msg_idx])
        else:
            helper_component.info(INFO_MSGS[msg_idx])
        
        time.sleep(2)
        helper_component.empty()
    
    # Sidebar for extra info
    st.sidebar.markdown("Combination of the following digits/symbols can be evaluated:")
    st.sidebar.write(DIGITS_SYMBOLS)

if __name__ == "__main__":
    main_app()