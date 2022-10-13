import random, sys, time, math, pygame
from pygame.locals import *
import numpy as np
import copy


FPS = 30

DIFF_WIDTH = 10
UPPER_WIDTH = 40

SCREEN_WIDTH = 360
SCREEN_HEIGHT = SCREEN_WIDTH + UPPER_WIDTH

HALF_SCREEN_WIDTH = int(SCREEN_WIDTH / 2)
HALF_SCREEN_HEIGHT = int(SCREEN_HEIGHT / 2)

CENTER_P = int(SCREEN_WIDTH / 2)
CENTER_Q = int(UPPER_WIDTH + (SCREEN_HEIGHT - UPPER_WIDTH)/2)

# Colors
#				 R    G    B
WHITE        = (255, 255, 255)
BLACK		 = (  0,   0,   0)
RED 		 = (200,  72,  72)
LIGHT_ORANGE = (198, 108,  58)
ORANGE       = (180, 122,  48)
GREEN		 = ( 72, 160,  72)
BLUE 		 = ( 66,  72, 200)
YELLOW 		 = (162, 162,  42)
NAVY         = ( 75,   0, 130)
PURPLE       = (143,   0, 255)

def main():
    global FPS_WATCH, SHOWSERF, BASIC_FONTS

    pygame.init()
    FPS_WATCH = pygame.time.Clock()

    SHOWSERF = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

    pygame.display.set_caption('Dodgy')

    BASIC_FONTS = pygame.font.Font('freesansbold.ttf', 16)

    

    init = True
    my_time = 0
    start_time = time.time()

    my_radius = 10
    my_init_position = [CENTER_P - int(my_radius/2), CENTER_Q - int(my_radius/2)]
    my_position = my_init_position
    my_speed = 5

    num_balls = 10
    gap_balls = 20

    
    min_ball_speed = 3.0
    max_ball_speed = 6.0

    ball_list = set_ball_pos_and_vel(num_balls, gap_balls, min_ball_speed, max_ball_speed)
    ball_radius = 4

    direction = ''
    while True: 

        if init == True:
            my_position = [CENTER_P - int(my_radius/2), CENTER_Q - int(my_radius/2)]
            ball_list = set_ball_pos_and_vel(num_balls, gap_balls, min_ball_speed, max_ball_speed)

            start_time = time.time()

            init = False

        
        for event in pygame.event.get(): 
            if event.type == QUIT:
                terminate()
            elif event.type == KEYDOWN:
                if (event.key == K_UP):
                    direction = 'UP'
                elif (event.key == K_DOWN):
                    direction = 'DOWN'
                elif (event.key == K_LEFT):
                    direction = 'LEFT'
                elif (event.key == K_RIGHT):
                    direction = 'RIGHT'
                elif event.key == K_ESCAPE:
                    terminate()
                elif event.key == K_SPACE:
                    init = True
                else:
                    direction = 'HOLD'

    
        if direction == 'UP':
            my_position[1] -= my_speed
        elif direction == 'DOWN':
            my_position[1] += my_speed
        elif direction == 'LEFT':
            my_position[0] -= my_speed
        elif direction == 'RIGHT':
            my_position[0] += my_speed

    
        my_position = constraint(my_position, my_radius)

    
        ball_list = update_balls(ball_list, ball_radius)

        # Lose :(
        init = check_lose(my_position, my_radius, ball_list, ball_radius, start_time)

    
        SHOWSERF.fill(BLACK)


        time_massage("Survival Time: " + str(time.time() - start_time), (10, 15))

        
        pygame.draw.circle(SHOWSERF, BLUE, (int(my_position[0]), int(my_position[1])), my_radius, 0)

        
        for i in range(len(ball_list)):
            pygame.draw.circle(SHOWSERF, RED, (int(ball_list[i][1]), int(ball_list[i][2])), ball_radius, 0)

        
        sketch_board()

        pygame.display.update()
        FPS_WATCH.tick(FPS)

# Exit the game
def terminate():
	pygame.quit()
	sys.exit()


def set_ball_pos_and_vel(num_balls, gap_balls, min_ball_speed, max_ball_speed):
    rand_pos_x = 0
    rand_pos_y = 0
    rand_vel_x = 0
    rand_vel_y = 0

    ball_list = []

    for i in range(num_balls):
        ball_list.append([])

        # Get random numbers
        rand_pos_x = random.random()
        rand_pos_y = random.random()
        rand_vel_x = random.random()
        rand_vel_y = random.random()

        ball_list[i].append(i) # id

        # initial x position
        if rand_pos_x > 0.5:
            ball_list[i].append(random.randint(CENTER_P + gap_balls, SCREEN_WIDTH - gap_balls))
        else:
            ball_list[i].append(random.randint(gap_balls, CENTER_P - gap_balls))

        # initial y position
        if rand_pos_y > 0.5:
            ball_list[i].append(random.randint(CENTER_Q + gap_balls, SCREEN_HEIGHT - gap_balls))
        else:
            ball_list[i].append(random.randint(UPPER_WIDTH + gap_balls, CENTER_Q - gap_balls))

        # initial x velocity
        if rand_vel_x > 0.5:
            ball_list[i].append(random.uniform(min_ball_speed, max_ball_speed))
        else:
            ball_list[i].append(-random.uniform(min_ball_speed, max_ball_speed))

        # initial y velocity
        if rand_vel_y > 0.5:
            ball_list[i].append(random.uniform(min_ball_speed, max_ball_speed))
        else:
            ball_list[i].append(-random.uniform(min_ball_speed, max_ball_speed))

    return ball_list

# Keep the agent inside gameboard
def constraint(my_position, my_radius):
    if my_position[0] <= DIFF_WIDTH + my_radius:
        my_position[0] = DIFF_WIDTH + my_radius

    if my_position[0] >= SCREEN_WIDTH - DIFF_WIDTH - my_radius:
        my_position[0] = SCREEN_WIDTH - DIFF_WIDTH - my_radius

    if my_position[1] >= SCREEN_HEIGHT - DIFF_WIDTH - my_radius:
        my_position[1] = SCREEN_HEIGHT - DIFF_WIDTH - my_radius

    if my_position[1] <= UPPER_WIDTH + DIFF_WIDTH + my_radius:
        my_position[1] = UPPER_WIDTH + DIFF_WIDTH + my_radius

    return my_position

# Update balls
def update_balls(ball_list, ball_radius):
    for i in range(len(ball_list)):
        # Move the balls
        ball_list[i][1] += ball_list[i][3]
        ball_list[i][2] += ball_list[i][4]

        # If ball hits the ball, it bounce
        if ball_list[i][1] <= DIFF_WIDTH + ball_radius:
            ball_list[i][1] = DIFF_WIDTH + ball_radius + 1
            ball_list[i][3] = -ball_list[i][3]

        if ball_list[i][1] >= SCREEN_WIDTH - DIFF_WIDTH - ball_radius:
            ball_list[i][1] = SCREEN_WIDTH - DIFF_WIDTH - ball_radius - 1
            ball_list[i][3] = -ball_list[i][3]

        if ball_list[i][2] >= SCREEN_HEIGHT - DIFF_WIDTH - ball_radius:
            ball_list[i][2] = SCREEN_HEIGHT - DIFF_WIDTH - ball_radius - 1
            ball_list[i][4] = -ball_list[i][4]

        if ball_list[i][2] <= UPPER_WIDTH + DIFF_WIDTH + ball_radius:
            ball_list[i][2] = UPPER_WIDTH + DIFF_WIDTH + ball_radius + 1
            ball_list[i][4] = -ball_list[i][4]

    return ball_list

# Check lose
def check_lose(my_position, my_radius, ball_list, ball_radius, start_time):
    # check collision
    for i in range(10):
        x_square = (my_position[0] - ball_list[i][1]) ** 2
        y_square = (my_position[1] - ball_list[i][2]) ** 2
        dist_balls = my_radius + ball_radius

        if (np.sqrt(x_square + y_square) < dist_balls):
            print("Survival time: " + str(time.time() - start_time))
            return True

    return False

# Display time
def time_massage(survive_timing, position):
	timeSurf = BASIC_FONTS.render(str(survive_timing), True, WHITE)
	timeRect = timeSurf.get_rect()
	timeRect.topleft = position
	SHOWSERF.blit(timeSurf, timeRect)

# Draw gameboard
def sketch_board():
    pygame.draw.line(SHOWSERF, WHITE, (DIFF_WIDTH, UPPER_WIDTH + DIFF_WIDTH), (DIFF_WIDTH, SCREEN_HEIGHT - DIFF_WIDTH), 3)
    pygame.draw.line(SHOWSERF, WHITE, (SCREEN_WIDTH - DIFF_WIDTH, UPPER_WIDTH + DIFF_WIDTH), (SCREEN_WIDTH - DIFF_WIDTH, SCREEN_HEIGHT - DIFF_WIDTH), 3)
    pygame.draw.line(SHOWSERF, WHITE, (DIFF_WIDTH, UPPER_WIDTH + DIFF_WIDTH), (SCREEN_WIDTH - DIFF_WIDTH, UPPER_WIDTH + DIFF_WIDTH), 3)
    pygame.draw.line(SHOWSERF, WHITE, (DIFF_WIDTH, SCREEN_HEIGHT - DIFF_WIDTH), (SCREEN_WIDTH - DIFF_WIDTH, SCREEN_HEIGHT - DIFF_WIDTH), 3)

if __name__ == '__main__':
	main()
